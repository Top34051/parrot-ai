import tw from "twin.macro";
import { useState, useEffect } from "react";
import useStore from "../store";
import config from "../config/index";
import Link from "next/link";

const Submission = () => {

  const { url, formData, answers } = useStore();

  useEffect(() => {
    let formData = new FormData();
    formData.append("url", url);
    formData.append("num_questions", answers.length.toString());
    for (let i = 0; i < answers.length; i++) {
      formData.append("audio_" + i, answers[i].audio);
      formData.append("text_" + i, answers[i].text);
    }
    console.log(formData);
    fetch(`${config.apiUrl}/submit`, {
      method: "POST",
      cache: "no-cache",
      body: formData,
      mode: "no-cors",
    }).catch(console.log);
  }, [answers]);

  return (
    <div tw="w-screen h-screen flex justify-center items-center">
      
      <section tw="absolute top-12 w-full">
        <div tw="flex justify-between px-12">
          <div>
            <h1 tw="text-2xl font-bold">{formData?.title}</h1>
            <p>
              Gooogle Form:{" "}
              <span>
                <a href={url} tw="text-purple-800">
                  {url}
                </a>
              </span>
            </p>
          </div>
          <h1 tw="text-xl font-semibold tracking-tight">Parrot.AI</h1>
        </div>
      </section>

      <div tw='flex flex-col space-y-14'>
        <p tw="text-6xl font-bold"> Your form has been submitted!</p>
        <div tw="flex justify-center">
          <Link href="/confirmation">
            <button
              tw="
              rounded-2xl text-white text-2xl font-bold 
              py-3 px-16 
              bg-green-500 hover:bg-green-600 active:bg-green-700
              focus:outline-none focus:ring focus:ring-green-400 
              "
            >
              Submit another form
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Submission;
