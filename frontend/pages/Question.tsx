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
  faArrowRight,
  faVolumeHigh,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import useStore from "../store";
import { useRouter } from "next/router";
import iconv from "iconv-lite";
import axios from "axios";

const CircleBox = ({ text }: { text: string }) => {
  return (
    <div tw="rounded-full w-12 h-12 bg-purple-600 text-white flex justify-center items-center">
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

const Arow = ({
  cText,
  content,
  Icon,
}: {
  cText: string;
  content: JSX.Element;
  Icon: JSX.Element | null;
}) => {
  return (
    <div tw="items-center relative flex space-x-4 w-full">
      <div>
        <CircleBox text={cText} />
      </div>
      <div tw="bg-ggg rounded-2xl flex items-center relative p-4 w-4/5">
        <div tw="font-mono text-black text-xl w-full">{content}</div>
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
  const { formData, nq, setNq } = useStore();
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
  }
  const questionText = `Q ${nq + 1}`;
  const questionTitle = formData.form_items[nq].data.text.title;
  const questionDesc = formData.form_items[nq].data.text.description;
  const titleAudio = formData.form_items[nq].data.audio_content.title;
  const descAudio = formData.form_items[nq].data.audio_content.description;

  useEffect(() => {
    if (audio) {
      fetch(audio)
        .then((r) => r.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.readAsText(blob, "UTF-8");
          reader.onload = function () {
            console.log(reader.result);
            axios
              .post("http://localhost:8000/transcribe", {
                audio_content: reader.result,
              })
              .then((res) => {
                setTranscribed(res.data);
              })
              .catch(console.log);
          };
        })
        .catch(console.log);
    }
  }, [audio]);

  useEffect(() => {
    // if (recordings) {
    //   for (let i = 0; i < recordings.length; i++) {
    //     console.log("akey ", recordings[0].key);
    //     deleteAudio(recordings[0].key);
    //   }
    // }
    handlers.cancelRecording();
    console.log("calling");
  }, [nq]);

  return (
    <div tw="w-screen h-screen flex justify-center items-center">
      <section tw="absolute top-10 w-full">
        <div tw="flex justify-between items-center px-10">
          <h1 tw="text-lg font-mono font-bold">{formData.title}</h1>
          <h1>Image Suthita</h1>
        </div>
      </section>
      <div tw="w-2/3 block space-y-10">
        <section tw="space-y-6">
          <Arow
            Icon={null}
            cText={questionText}
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
        </section>
        <section>
          <Arow
            Icon={
              <RecorderControls
                recorderState={recorderState}
                handlers={handlers}
              />
            }
            cText={`A ${nq + 1}`}
            content={
              <>
                <RecordingsList audio={audio} />
                {transcribed != "" && <p>{transcribed}</p>}
              </>
            }
          />
        </section>
      </div>
      <div
        tw="absolute bottom-10 right-0 pr-32 pb-4 cursor-pointer"
        onClick={() => setNq(nq + 1)}
      >
        <FontAwesomeIcon icon={faArrowRight} size="6x" />
      </div>
      <div
        tw="absolute bottom-10 left-0 pl-32 pb-4 cursor-pointer"
        onClick={() => setNq(nq - 1)}
      >
        <FontAwesomeIcon icon={faArrowLeft} size="6x" />
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Question), {
  ssr: false,
});
