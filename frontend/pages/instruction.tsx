import tw from "twin.macro";
import Buttons from "../components/buttons";


const Instruction = () => {
  return (
    <div tw="h-screen w-screen px-32 py-20 space-y-10">

      <section tw="absolute top-12 right-12">
        <h1 tw="text-xl font-semibold tracking-tight">Parrot.AI</h1>
      </section>

      <h1 tw="text-6xl text-left font-bold">
        Instructions
      </h1>
      <div tw='space-y-4'>

        <div tw="flex items-center space-x-3">
          <h1 tw="font-semibold text-2xl">Click</h1>
          <Buttons.Button buttonType="audio" size="mini"/>
          <h1 tw="font-semibold text-2xl">to listen to the question.</h1>
        </div>

        <div tw="flex items-center space-x-3">
          <h1 tw="font-semibold text-2xl">Click</h1>
          <Buttons.Button buttonType="start-record" size="mini"/>
          <h1 tw="font-semibold text-2xl">to record your answer.</h1>
        </div>

        <div tw="flex items-center space-x-3">
          <h1 tw="font-semibold text-2xl">Click</h1>
          <Buttons.Button buttonType="stop-record" size="mini"/>
          <h1 tw="font-semibold text-2xl">to stop the recording.</h1>
        </div>

        <div tw="flex items-center space-x-3">
          <h1 tw="font-semibold text-2xl">Click</h1>
          <Buttons.Button buttonType="next" size="mini"/>
          <h1 tw="font-semibold text-2xl">to confirm and go to the next question.</h1>
        </div>
        
        <div tw="flex items-center space-x-3">
          <h1 tw="font-semibold text-2xl">Click</h1>
          <Buttons.Button buttonType="back" size="mini"/>
          <h1 tw="font-semibold text-2xl">to return to the previous question.</h1>
        </div>

      </div>
      <div tw="absolute bottom-12 right-12 cursor-pointer">
        <Buttons.LinkedButton buttonType="next" size="normal" href="/form" />
      </div>
      <div tw="absolute bottom-12 left-12 cursor-pointer">
        <Buttons.LinkedButton buttonType="back" size="normal" href="/confirmation" />
      </div>
    </div>
  );
};

export default Instruction;
