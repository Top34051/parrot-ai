import tw from "twin.macro";
import Link from "next/link";
import { RiArrowRightCircleFill } from "react-icons/ri";


const Item = ({ Button, text }: { Button: JSX.Element; text: string }) => {
  return (
    <div tw="flex space-x-6">
      <div>{Button}</div>
      <h1 tw="font-semibold text-xl">{text}</h1>
    </div>
  );
};

const Instruction = () => {
  return (
    <div tw="h-screen w-screen p-20">
      <h1 tw="text-4xl text-left font-bold">
        Instructions
      </h1>
      <div tw="flex items-center mt-10">
        <section tw="grid grid-rows-4 space-y-2">
          <Item
            Button={<RiArrowRightCircleFill />}
            text={"Click to record"}
          />
          <Item
            Button={<RiArrowRightCircleFill />}
            text={"Click to stop recording"}
          />
          <Item
            Button={<RiArrowRightCircleFill />}
            text={"Click to confirm and go to next question"}
          />
          <Item
            Button={<RiArrowRightCircleFill />}
            text={"Click to go back to the previous question"}
          />
        </section>
      </div>
      <div tw="absolute bottom-8 right-0 pr-14 pb-4 cursor-pointer">
        <Link href="/Question">
          <RiArrowRightCircleFill size={60} color='green'/>
        </Link>
      </div>
    </div>
  );
};

export default Instruction;
