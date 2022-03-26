import tw from "twin.macro";

const Items = ({ Button, text }: { Button: any; text: string }) => {
  return (
    <div>
      <Button />
      <h1 tw="text-lg">{text}</h1>
    </div>
  );
};

const Instruction = () => {
  return (
    <div tw="h-screen w-screen flex items-center justify-center">
      <section>
        <Items Button={} text={"Click to record"} />
        <Items Button={} text={"Click to stop recording"} />
        <Items Button={} text={"Click to confirm and go to next question"} />
        <Items Button={} text={"Click to go back to the previous question"} />
      </section>
    </div>
  );
};
