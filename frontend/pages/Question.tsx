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
import iconv from "iconv-lite";

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
  const router = useRouter();

  if (!formData || nq < 0) {
    router.push("/");
    return null;
  }
  if (nq >= formData.form_items.length) {
    router.push("/conclusion");
    // return null;
  }
  const questionText = `Q ${nq + 1}`;
  const questionTitle = formData.form_items[nq].data.text.title;
  const questionAudio = formData.form_items[nq].data.audio_content.title;

  let audioCtx: any;
  let source: any;
  let audioBuffer;

  useEffect(() => {
    //@ts-expect-error
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    source = audioCtx.createBufferSource();
    audioBuffer = questionAudio;
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
        setIsPlaying(false);
      },
      false
    );

    audioCtx.onstatechange = function () {
      console.log(audioCtx.state);
    };
  }, [nq]);

  useEffect(() => {
    if (isPlaying && source) {
      source.start(0);
    } else {
      // source.stop(0);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audio && audio.length > 0) {
      fetch(
        `https://parrot-ai-gg.uc.r.appspot.com/forms?` +
          new URLSearchParams({}).toString(),
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-type": "application/json",
            accept: "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setFormData(res);
          setTimeout(() => {
            router.push("/Question");
          }, 5000);
        })
        .catch(console.error);
    }
  }, [audio]);

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
              setIsPlaying(true);
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
