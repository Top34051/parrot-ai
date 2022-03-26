import tw from "twin.macro";

const CircleBox = ({ text }: { text: string }) => {
  return <div tw="rounded-full w-8 bg-purple-600 text-white h-8">{text}</div>;
};

const Arow = ({
  cText,
  text,
  Icon,
}: {
  cText: string;
  text: string;
  Icon: JSX.Element;
}) => {
  return (
    <div tw="grid grid-cols-10">
      <CircleBox text={cText} tw="col-span-2" />
      <div tw="bg-ggg">
        <div tw="font-mono text-black text-xl">{text}</div>
        {Icon}
      </div>
    </div>
  );
};

const Question = () => {
  return (
    <div tw="flex justify-center items-center">
      <section tw="flex justify-between">
        <div>"WW8"</div>
        <h1>Image Suthita</h1>
      </section>
      <section></section>
      <section></section>
    </div>
  );
};

export default Question;
