import tw from "twin.macro";
import Next from "../svgs/Next";
import Prev from "../svgs/Prev";
import Stop from "../svgs/Stop";
import Record from "../svgs/Record";

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
      <h1 tw="text-purple-500 text-3xl font-mono font-bold px-8 py-4">
        Instruction
      </h1>
      <div tw="flex items-center justify-center">
        <section tw="grid grid-rows-4">
          <Item Button={<Record />} text={"Click to record"} />
          <Item Button={<Stop />} text={"Click to stop recording"} />
          <Item
            Button={<Next />}
            text={"Click to confirm and go to next question"}
          />
          <Item
            Button={<Prev />}
            text={"Click to go back to the previous question"}
          />
        </section>
      </div>
    </div>
  );
};
export default Instruction;
