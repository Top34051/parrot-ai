import tw from "twin.macro";
import { useState, useEffect } from "react";
import useStore from "../store";
import config from "../config/index";
import { CgSpinner } from "react-icons/cg";

const Submission = () => {

  const { url, formData, answers } = useStore();

  useEffect(() => {
    let formData = new FormData();
    for (let i = 0; i < answers.length; i++) {
      formData.append("ans" + i + "_audio", answers[i].audio);
      formData.append("ans" + i + "_text", answers[i].text);
    }
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

      <p tw="text-6xl font-bold"> Your form has been submitted!</p>

    </div>
  );
};

export default Submission;
