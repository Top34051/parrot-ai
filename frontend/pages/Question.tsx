import tw from "twin.macro";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useRecorder from "../hooks/use-recorder";
import { UseRecorder } from "../types/recorder";
import RecordIco from "../svgs/Record";

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
  Icon: JSX.Element;
  onClick: any;
}) => {
  return (
    <div tw="grid grid-cols-10 h-80 items-center">
      <div tw="col-span-2">
        <CircleBox text={cText} />
      </div>
      <div tw="col-span-8 bg-ggg rounded-2xl flex items-center relative p-4">
        <div tw="font-mono text-black text-xl">{content}</div>
        <div tw="h-12 w-12 absolute right-1" onClick={onClick}>
          {Icon}
        </div>
      </div>
    </div>
  );
};

const Question = () => {
  const { recorderState, ...handlers }: UseRecorder = useRecorder();
  const { audio } = recorderState;
  console.log(recorderState);

  useEffect(() => {
    console.log(recorderState);
  }, [recorderState]);

  return (
    <div tw="w-screen h-screen flex justify-center items-center">
      <div tw="w-2/3 h-full block">
        <section tw="flex justify-between">
          <div>"WW8"</div>
          <h1>Image Suthita</h1>
        </section>
        <section>{/* <Arow  /> */}</section>
        <section>
          <Arow
            Icon={<RecordIco />}
            cText={"A1"}
            content={<p>Hello</p>}
            onClick={startRecording}
          />
        </section>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Question), {
  ssr: false,
});
