import tw from "twin.macro";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useRecorder from "../hooks/use-recorder";
import { UseRecorder } from "../types/recorder";
import RecorderControls from "../components/renderControl";
import RecordingsList from "../components/recrodingList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
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
  const [transcribeAudio, setTranscribeAudio] = useState("");
  const { formData, nq, setNq } = useStore();
  const router = useRouter();

  if (!formData) {
    router.push("/");
    return null;
  }

  // const questionText = formData?.form_items[0].data.text;
  const questionText = `Q ${nq + 1}`;

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
            content={<Qtext qstr={"Name"} />}
            onClick={() => {
              setIsPlaying(!isPlaying);
            }}
          />
          <div tw="hidden">
            {isPlaying && (
              <audio src={transcribeAudio} autoPlay>
                Your browser doesn't support the audio
              </audio>
            )}
          </div>
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
      <div tw="absolute bottom-10 right-0 pr-32 pb-4">
        <FontAwesomeIcon icon={faArrowRight} size="6x" />
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Question), {
  ssr: false,
});
