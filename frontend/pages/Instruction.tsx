import tw from "twin.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faSave,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Item = ({ Button, text }: { Button: JSX.Element; text: string }) => {
  return (
    <div tw="flex space-x-6">
      <div>{Button}</div>
      <h1 tw="font-bold text-4xl">{text}</h1>
    </div>
  );
};

const Instruction = () => {
  return (
    <div tw="h-screen w-screen">
      <h1 tw="text-purple-700 text-6xl text-center font-mono font-bold px-8 py-4">
        Instruction
      </h1>
      <div tw="flex items-center h-full justify-center">
        <section tw="grid grid-rows-4 space-y-6">
          <Item
            Button={<FontAwesomeIcon icon={faMicrophone} size="2x" />}
            text={"Click to record"}
          />
          <Item
            Button={<FontAwesomeIcon icon={faSave} size="2x" />}
            text={"Click to stop recording"}
          />
          <Item
            Button={<FontAwesomeIcon icon={faArrowLeft} size="2x" />}
            text={"Click to confirm and go to next question"}
          />
          <Item
            Button={<FontAwesomeIcon icon={faArrowRight} size="2x" />}
            text={"Click to go back to the previous question"}
          />
        </section>
      </div>
      <div tw="absolute bottom-10 right-0 pr-32 pb-4 cursor-pointer">
        <Link href="/Question">
          <FontAwesomeIcon icon={faArrowRight} size="4x" />
        </Link>
      </div>
    </div>
  );
};
export default Instruction;
