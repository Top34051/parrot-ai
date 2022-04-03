import tw from "twin.macro";
import Link from "next/link";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { BsRecordFill, BsStopFill } from "react-icons/bs"
import { FcSpeaker } from "react-icons/fc"


const Item = ({ Button, text }: { Button: JSX.Element; text: string }) => {
  return (
    <div tw="flex items-center space-x-3">
      <div>{Button}</div>
      <h1 tw="font-semibold text-2xl">{text}</h1>
    </div>
  );
};

// {!formData && !isLoading && <button
//   tw="
//     flex items-center
//     text-white text-xl font-semibold 
//     py-2 px-4 rounded-2xl 
//     bg-purple-600 hover:bg-purple-700 active:bg-purple-800
//     focus:outline-none focus:ring focus:ring-purple-300 
//   "
// >
//   {"Fill form"}
// </button>}

const Instruction = () => {
  return (
    <div tw="h-screen w-screen px-32 py-20 space-y-10">
      <h1 tw="text-7xl text-left font-bold">
        Instructions
      </h1>
      <div tw='space-y-4'>

        <div tw="flex items-center space-x-3">
          <h1 tw="font-semibold text-2xl">Click</h1>
          <FcSpeaker size={20} tw='text-white rounded-3xl border border-gray-300 h-9 w-14'/>
          <h1 tw="font-semibold text-2xl">to listen to the question.</h1>
        </div>

        <div tw="flex items-center space-x-3">
          <h1 tw="font-semibold text-2xl">Click</h1>
          <BsRecordFill size={10} color='#de5246' tw='text-white rounded-3xl bg-gray-300 h-9 w-14 p-1'/>
          <h1 tw="font-semibold text-2xl">to record your answer.</h1>
        </div>

        <div tw="flex items-center space-x-3">
          <h1 tw="font-semibold text-2xl">Click</h1>
          <BsStopFill size={10} color='#de5246' tw='text-white rounded-3xl bg-gray-300 h-9 w-14 p-1'/>
          <h1 tw="font-semibold text-2xl">to stop the recording.</h1>
        </div>

        <div tw="flex items-center space-x-3">
          <h1 tw="font-semibold text-2xl">Click</h1>
          <HiArrowSmRight size={20} tw='text-white rounded-3xl bg-green-500 h-9 w-14'/>
          <h1 tw="font-semibold text-2xl">to confirm and go to the next question.</h1>
        </div>
        
        <div tw="flex items-center space-x-3">
          <h1 tw="font-semibold text-2xl">Click</h1>
          <HiArrowSmLeft size={20} tw='text-white rounded-3xl bg-gray-400 h-9 w-14'/>
          <h1 tw="font-semibold text-2xl">to return to the previous question.</h1>
        </div>

      </div>
      <div tw="absolute bottom-12 right-12 cursor-pointer">
        <Link href="/form">
          <HiArrowSmRight size={20} tw='text-white rounded-3xl bg-green-500 h-12 w-24'/>
        </Link>
      </div>
    </div>
  );
};

export default Instruction;
