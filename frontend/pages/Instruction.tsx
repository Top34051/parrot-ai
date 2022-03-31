import tw from "twin.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faSave,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const Item = ({ Button, text }: { Button: JSX.Element; text: string }) => {
  return (
    <div tw="row-span-1 grid grid-cols-2 items-center">
      <div tw="col-span-1 w-2/3">{Button}</div>
      <h1 tw="col-span-1 font-bold text-2xl">{text}</h1>
    </div>
  );
};

const Instruction = () => {
  return (
    <div tw="h-screen w-screen">
      <h1 tw="text-purple-700 text-3xl font-mono font-bold px-8 py-4">
        Instruction
      </h1>
      <div tw="flex items-center">
        <section tw="grid grid-rows-4">
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
    </div>
  );
};
export default Instruction;
