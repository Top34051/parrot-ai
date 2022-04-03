import tw from "twin.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faSave,
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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
            Button={<FontAwesomeIcon icon={faMicrophone} size="2x" />}
            text={"Click to record"}
          />
          <Item
            Button={<FontAwesomeIcon icon={faSave} size="2x" />}
            text={"Click to stop recording"}
          />
          <Item
            Button={<FontAwesomeIcon icon={faCircleArrowLeft} size="2x" />}
            text={"Click to confirm and go to next question"}
          />
          <Item
            Button={<FontAwesomeIcon icon={faCircleArrowRight} size="2x" />}
            text={"Click to go back to the previous question"}
          />
        </section>
      </div>
      <div tw="absolute bottom-10 right-0 pr-32 pb-4 cursor-pointer">
        <Link href="/Question">
          <FontAwesomeIcon icon={faCircleArrowRight} size="3x"/>
        </Link>
      </div>
    </div>
  );
};

export default Instruction;
