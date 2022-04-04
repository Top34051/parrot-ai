import tw from "twin.macro";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useRecorder from "../hooks/use-recorder";
import { UseRecorder } from "../types/recorder";
import useRecordingsList from "../hooks/use-recordings-list";
import RecorderControls from "../components/renderControl";
import RecordingsList from "../components/recrodingList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowRight,
  faVolumeHigh,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import useStore from "../store";
import { useRouter } from "next/router";
import iconv from "iconv-lite";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { BsRecordFill, BsStopFill } from "react-icons/bs";
import { FcSpeaker } from "react-icons/fc";
import Buttons from "../components/buttons";
const config = require("../config");

const CircleBox = ({ text }: { text: string }) => {
  return (
    <div tw="rounded-full w-14 h-14 bg-purple-600 font-semibold text-lg text-white flex justify-center items-center">
      <div>{text}</div>
    </div>
  );
};

const QuestionCom = ({
  text,
  Icon,
  click,
}: {
  text: string;
  Icon: JSX.Element;
  click: () => void;
}) => {
  return (
    <div>
      <div tw="flex">
        <div>{text}</div>
        <div tw="px-4 justify-self-end cursor-pointer" onClick={click}>
          {Icon}
        </div>
      </div>
    </div>
  );
};

const Card = ({
  text,
  content,
  Icon,
}: {
  text: string;
  content: JSX.Element;
  Icon: JSX.Element | null;
}) => {
  return (
    <div tw="flex w-full space-x-3 items-center">
      <div>
        <CircleBox text={text} />
      </div>
      <div tw="bg-gray-200 rounded-xl flex justify-between p-4 w-full">
        <div tw="w-4/5">{content}</div>
        {Icon && <div tw="px-4 justify-self-end cursor-pointer">{Icon}</div>}
      </div>
    </div>
  );
};

const Sound = ({ text, playCount }: { text: string; playCount: number }) => {
  let audioCtx: any;
  let source: any;
  let audioBuffer;
  useEffect(() => {
    //@ts-expect-error
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    source = audioCtx.createBufferSource();
    audioBuffer = text;
    audioCtx.decodeAudioData(
      new Uint8Array(iconv.encode(audioBuffer, "iso-8859-1")).buffer,
      function (buffer: any) {
        source.buffer = buffer;
        source.connect(audioCtx.destination);
      },
      function (e: any) {
        console.log("Error with decoding audio data" + JSON.stringify(e));
      }
    );
    audioCtx.addEventListener(
      "ended",
      () => {
        // setIsPlaying(false);
      },
      false
    );

    audioCtx.onstatechange = function () {
      console.log(audioCtx.state);
    };
    if (playCount != 0) {
      source.start(0);
    }
  }, [playCount]);
  return null;
};

const Question = () => {
  const { recorderState, ...handlers }: UseRecorder = useRecorder();
  const { audio } = recorderState;
  const { clearAudio, deleteAudio, recordings } = useRecordingsList(audio);
  const { url, formData, nq, setNq, setAns } = useStore();
  const [titleSCoutner, setTitleSCounter] = useState(0);
  const [descSCounter, setDescSCoutner] = useState(0);
  const [transcribed, setTranscribed] = useState("");
  const router = useRouter();

  if (!formData || nq < 0) {
    router.push("/");
    return null;
  }

  if (nq >= formData.form_items.length) {
    router.push("/conclusion");
    return null;
  }

  const questionText = `Q${nq + 1}`;
  const questionTitle = formData.form_items[nq].data.text.title;
  const questionDesc = formData.form_items[nq].data.text.description;
  const titleAudio = formData.form_items[nq].data.audio_content.title;
  const descAudio = formData.form_items[nq].data.audio_content.description;

  useEffect(() => {
    if (audio) {
      fetch(audio)
        .then((r) => r.blob())
        .then((blob) => {
          let formData = new FormData();
          formData.append("audio_file", blob);
          fetch(config.apiUrl + "/transcribe", {
            method: "POST",
            cache: "no-cache",
            body: formData,
            mode: "no-cors",
          })
            .then((res) => res.json())
            .then((text) => {
              if (text) {
                setTranscribed(text);
                setAns(nq, {
                  audio: blob,
                  text,
                });
              }
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch(console.log);
    }
  }, [audio]);

  useEffect(() => {
    clearAudio();
  }, [nq]);

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
          Icon={null}
          text={questionText}
          content={
            <div>
              <QuestionCom
                Icon={<FontAwesomeIcon icon={faVolumeHigh} size="2x" />}
                click={() => {
                  setTitleSCounter(titleSCoutner + 1);
                }}
                text={questionTitle}
              />
              <Sound text={titleAudio} playCount={titleSCoutner} />
              {questionDesc && (
                <>
                  <QuestionCom
                    Icon={<FontAwesomeIcon icon={faVolumeHigh} size="2x" />}
                    click={() => {
                      setDescSCoutner(descSCounter + 1);
                    }}
                    text={questionDesc}
                  />
                  <Sound text={descAudio} playCount={descSCounter} />{" "}
                </>
              )}
            </div>
          }
        />

        <Card
          Icon={
            <RecorderControls
              recorderState={recorderState}
              handlers={handlers}
            />
          }
          text={`A${nq + 1}`}
          content={
            <>
              {/* <RecordingsList recordings={audio} /> */}
              {transcribed == "" ? <p>No audio</p> : <p>{transcribed}</p>}
            </>
          }
        />
      </div>

      <div
        tw="absolute bottom-12 right-12 cursor-pointer"
        onClick={() => {
          if (nq >= formData.form_items.length - 1) {
            router.push("/conclusion");
          } else {
            setNq(nq + 1);
          }
        }}
      >
        <Buttons.Button buttonType="next" size="normal" />
      </div>

      <div
        tw="absolute bottom-12 left-12 cursor-pointer"
        onClick={() => {
          if (nq <= 0) {
            router.push("/instruction");
          } else {
            setNq(nq - 1);
          }
        }}
      >
        <Buttons.Button buttonType="back" size="normal" />
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Question), {
  ssr: false,
});
