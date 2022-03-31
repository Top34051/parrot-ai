import tw from "twin.macro";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import useRecorder from "../hooks/use-recorder";
import { UseRecorder } from "../types/recorder";
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

const CircleBox = ({ text }: { text: string }) => {
  return (
    <div tw="rounded-full w-12 h-12 bg-purple-600 text-white flex justify-center items-center">
      <div>{text}</div>
    </div>
  );
};

const Arow = ({
  cText,
  content,
  Icon,
  onClick,
}: {
  cText: string;
  content: JSX.Element;
  Icon: JSX.Element | null;
  onClick: any;
}) => {
  return (
    <div tw="items-center relative flex space-x-4 w-full">
      <div>
        <CircleBox text={cText} />
      </div>
      <div tw="bg-ggg rounded-2xl flex items-center relative p-4 w-4/5">
        <div tw="font-mono text-black text-xl w-full">{content}</div>
        <div tw="px-4 justify-self-end cursor-pointer" onClick={onClick}>
          {Icon}
        </div>
      </div>
    </div>
  );
};

const Qtext = ({ qstr }: { qstr: string }) => {
  return (
    <div>
      <span>{qstr}</span>
    </div>
  );
};

const Question = () => {
  const { recorderState, ...handlers }: UseRecorder = useRecorder();
  const { audio } = recorderState;
  const [isPlaying, setIsPlaying] = useState(false);

  const { formData, nq, setNq } = useStore();
  const audioRef = useRef();
  const router = useRouter();
  console.log(formData);

  if (!formData) {
    router.push("/");
    return null;
  }

  // const questionText = formData?.form_items[0].data.text;
  const questionText = `Q ${nq + 1}`;
  const questionTitle = formData.form_items[nq].data.text.title;
  const questionAudio = formData.form_items[
    nq
  ].data.audio_content.title.replaceAll("\\x", "");
  console.log(questionAudio);
  // const blob = new Blob([questionAudio], { type: "audio/wav" });
  // const audioUrl = URL.createObjectURL(blob);
  //@ts-expect-error
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioCtx.createBufferSource();
  let audioBuffer;

  useEffect(() => {
    // function _base64ToArrayBuffer(base64: string) {
    //   var binary_string = window.atob(base64);
    //   var len = binary_string.length;
    //   var bytes = new Uint8Array(len);
    //   for (var i = 0; i < len; i++) {
    //     bytes[i] = binary_string.charCodeAt(i);
    //   }
    //   return bytes.buffer;
    // }
    function urlB64ToUint8Array(base64String: string) {
      const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }

      return outputArray;
    }

    audioBuffer = urlB64ToUint8Array(questionAudio);
    audioCtx.decodeAudioData(
      audioBuffer,
      function (buffer) {
        source.buffer = buffer;

        source.connect(audioCtx.destination);
        source.loop = true;
      },

      function (e) {
        console.log("Error with decoding audio data" + e.err);
      }
    );
  }, []);

  /* const [audioObj] = useState(new Audio(questionAudio));*/

  // useEffect(() => {
  //   isPlaying ? audioObj.play() : audioObj.pause();
  // }, [isPlaying]);

  return (
    <div tw="w-screen h-screen flex justify-center items-center">
      <section tw="absolute top-10 w-full">
        <div tw="flex justify-between items-center px-10">
          <div>"WW8"</div>
          <h1>Image Suthita</h1>
        </div>
      </section>
      <div tw="w-2/3 block space-y-10">
        <section>
          <Arow
            Icon={<FontAwesomeIcon icon={faVolumeHigh} size="2x" />}
            cText={questionText}
            content={<Qtext qstr={questionTitle} />}
            onClick={() => {
              setIsPlaying(!isPlaying);
              source.start(0);
            }}
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
            cText={"A1"}
            content={<RecordingsList audio={audio} />}
            onClick={() => {}}
          />
        </section>
        <div>
          {/* <audio src={audioUrl} autoPlay controls />
          <a href={audioUrl} download>
            Click to download
          </a> */}
        </div>
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
