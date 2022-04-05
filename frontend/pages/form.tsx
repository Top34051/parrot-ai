import tw from "twin.macro";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useRecorder from "../hooks/use-recorder";
import { UseRecorder } from "../types/recorder";
import useRecordingsList from "../hooks/use-recordings-list";
import RecorderControls from "../components/renderControl";
import useStore from "../store";
import { useRouter } from "next/router";
import iconv from "iconv-lite";
import Buttons from "../components/buttons";
const config = require("../config");

const LabelCircle = ({ label }: { label: string }): JSX.Element => {
  return (
    <div tw="rounded-full w-16 h-16 bg-purple-600 font-semibold text-lg text-white flex justify-center items-center">
      <p>{label}</p>
    </div>
  );
};

const Card = ({
  label,
  content,
  controller,
}: {
  label: string;
  content: JSX.Element;
  controller: JSX.Element | null;
}) => {
  return (
    <div tw="flex w-full space-x-3 items-center">
      <LabelCircle label={label} />
      <div tw="bg-gray-200 rounded-xl flex justify-between space-x-2 p-4 w-full">
        <div tw="w-auto">{content}</div>
        {controller && (
          <div tw="justify-self-end cursor-pointer">{controller}</div>
        )}
      </div>
    </div>
  );
};

const Sound = ({
  buffer,
  playCount,
}: {
  buffer: string;
  playCount: number;
}) => {
  let audioCtx: any;
  let source: any;

  useEffect(() => {
    console.log("Sound playCount increase");

    //@ts-expect-error
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    source = audioCtx.createBufferSource();

    audioCtx.decodeAudioData(
      new Uint8Array(iconv.encode(buffer, "iso-8859-1")).buffer,
      function (buffer: any) {
        source.buffer = buffer;
        source.connect(audioCtx.destination);
      },
      function (e: any) {
        console.log("Error with decoding audio data" + JSON.stringify(e));
      }
    );

    audioCtx.addEventListener("ended", () => {}, false);

    audioCtx.onstatechange = function () {
      console.log(audioCtx.state);
    };

    if (playCount != 0) source.start(0);
  }, [playCount]);

  return null;
};

const Bouncing = () => (
  <div tw="animate-pulse bg-gray-400 p-2 w-36 h-3 rounded-full"></div>
);

const Form = () => {
  const router = useRouter();

  const { recorderState, ...handlers }: UseRecorder = useRecorder();
  const { audio } = recorderState;
  const { clearAudio } = useRecordingsList(audio);

  const { url, formData, questionIndex, setQuestionIndex, answers, setAnswer } =
    useStore();

  const [questionSound, setQuestionSound] = useState(0);

  const [answerText, setAnswerText] = useState("");
  const [answerAudio, setAnswerAudio] = useState("");
  const [answerSound, setAnswerSound] = useState(0);

  if (!formData || questionIndex < 0) {
    router.push("/");
    return null;
  }

  if (questionIndex >= formData.form_items.length) {
    router.push("/submission");
    return null;
  }

  const questionLabel = `Q${questionIndex + 1}`;
  const answerLabel = `A${questionIndex + 1}`;

  const itemType = formData.form_items[questionIndex].type;

  const questionText = formData.form_items[questionIndex].data.text;
  const questionAudio = formData.form_items[questionIndex].data.audio;

  useEffect(() => {
    if (audio) {
      fetch(audio)
        .then((r) => r.blob())
        .then((blob) => {
          const formData = new FormData();
          formData.append("audio_file", blob);

          fetch(config.apiUrl + "/convert_audio", {
            method: "POST",
            cache: "no-cache",
            body: formData,
            mode: "cors",
          })
            .then((res) => res.json())
            .then((content) => {
              setAnswerAudio(content);
            })
            .then(() => {
              fetch(config.apiUrl + "/get_transcript", {
                method: "POST",
                cache: "no-cache",
                body: formData,
                mode: "cors",
              })
                .then((res) => res.json())
                .then((text) => {
                  if (text) setAnswerText(text);
                })
                .catch((err) => {
                  console.error(err);
                });
            });
        });
    }
  }, [audio]);

  useEffect(() => {
    if (answers[questionIndex] && answers[questionIndex].text)
      setAnswerText(answers[questionIndex].text);
    else setAnswerText("");
    if (answers[questionIndex] && answers[questionIndex].audio)
      setAnswerAudio(answers[questionIndex].audio);
    else setAnswerAudio("");
    clearAudio();
  }, [questionIndex]);

  useEffect(() => {
    console.log("Update answer for question", questionIndex);
    setAnswer(questionIndex, {
      audio: answerAudio,
      text: answerText,
    });
  }, [answerText]);

  return (
    <div tw="w-screen h-screen flex justify-center items-center">
      <section tw="absolute top-12 w-full">
        <div tw="flex justify-between px-12">
          <div>
            <h1 tw="text-2xl font-bold">{formData.title}</h1>
            <p>
              Gooogle Form:{" "}
              <span>
                <a href={url} tw="text-purple-800">
                  {url}
                </a>
              </span>
            </p>
          </div>
          <h1 tw="text-xl font-semibold tracking-tight">Parrot.AI</h1>
        </div>
      </section>

      <div tw="flex flex-col justify-center space-y-3 w-4/6">
        <Card
          label={questionLabel}
          content={
            <div tw="text-xl whitespace-pre-line max-h-60 overflow-y-auto">
              {questionText}
            </div>
          }
          controller={
            <>
              <Buttons.Button
                buttonType="audio"
                size="normal"
                onClick={() => {
                  setQuestionSound(questionSound + 1);
                }}
              />
              <Sound buffer={questionAudio} playCount={questionSound} />
            </>
          }
        />

        {itemType !== "title-and-description" && (
          <Card
            label={answerLabel}
            content={
              <>
                {answerText == "" ? (
                  <Bouncing />
                ) : (
                  <p tw="text-xl whitespace-pre-line">{answerText}</p>
                )}
              </>
            }
            controller={
              <div tw="flex space-x-3">
                {answerAudio !== "" && (
                  <Buttons.Button
                    buttonType="audio"
                    size="normal"
                    onClick={() => {
                      setAnswerSound(answerSound + 1);
                    }}
                  />
                )}
                {answerAudio !== "" && (
                  <Sound buffer={answerAudio} playCount={answerSound} />
                )}
                <RecorderControls
                  recorderState={recorderState}
                  handlers={handlers}
                />
              </div>
            }
          />
        )}
      </div>

      <div
        tw="absolute bottom-12 right-12 cursor-pointer"
        onClick={() => {
          if (questionIndex >= formData.form_items.length - 1)
            router.push("/submission");
          else setQuestionIndex(questionIndex + 1);
        }}
      >
        <Buttons.Button buttonType="next" size="normal" />
      </div>

      <div
        tw="absolute bottom-12 left-12 cursor-pointer"
        onClick={() => {
          if (questionIndex <= 0) router.push("/instruction");
          else setQuestionIndex(questionIndex - 1);
        }}
      >
        <Buttons.Button buttonType="back" size="normal" />
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Form), {
  ssr: false,
});
