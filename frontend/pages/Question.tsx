import tw from "twin.macro";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useRecorder from "../hooks/use-recorder";
import { UseRecorder } from "../types/recorder";
import RecorderControls from "../components/renderControl";
import RecordingsList from "../components/recrodingList";

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
    <div tw="items-center relative flex space-x-4">
      <div>
        <CircleBox text={cText} />
      </div>
      <div tw="bg-ggg rounded-2xl flex items-center relative p-4 w-4/5">
        <div tw="font-mono text-black text-xl">{content}</div>
        <div tw="h-12 w-12 absolute right-1">{Icon}</div>
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
            Icon={null}
            cText={"Q1"}
            content={<Qtext qstr={"Name"} />}
            onClick={() => {}}
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
    </div>
  );
};

export default dynamic(() => Promise.resolve(Question), {
  ssr: false,
});
