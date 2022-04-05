import tw from "twin.macro";
import { useState, useEffect } from "react";
import useStore from "../store";
import config from "../config/index";
import Link from "next/link";
import { useRouter } from "next/router";
import Buttons from "../components/buttons";

const Submission = () => {
  const router = useRouter();

  const { url, formData, answers, resetAnswers, setQuestionIndex } = useStore();
  const [canSubmit, setCanSubmit] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    console.log("answers:", answers);
    let invalid = false;
    for (let i = 0; i < answers.length; i++) {
      if (formData?.form_items[i].required && answers[i].text === "")
        invalid = true;
    }
    setCanSubmit(!invalid);
  }, [answers]);

  useEffect(() => {
    if (canSubmit) {
      let formData = new FormData();
      formData.append("url", url);
      formData.append("num_questions", answers.length.toString());
      for (let i = 0; i < answers.length; i++) {
        formData.append("audio_" + i, answers[i].audio);
        formData.append("audio_url_" + i, answers[i].audio_url);
        formData.append("text_" + i, answers[i].text);
      }
      fetch(`${config.apiUrl}/submit`, {
        method: "POST",
        cache: "no-cache",
        body: formData,
        mode: "no-cors",
      }).catch(console.log);
      setQuestionIndex(0);
      resetAnswers(answers.length);
      setIsSubmitted(true);
    }
  }, [canSubmit]);

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

      {!isSubmitted && (
        <div tw="flex flex-col space-y-14">
          <p tw="text-4xl font-bold">
            {" "}
            Please answer all the required questions.
          </p>
        </div>
      )}

      {isSubmitted && (
        <div tw="flex flex-col space-y-14">
          <p tw="text-6xl font-bold"> Your form has been submitted!</p>
          <div tw="flex justify-center">
            <Link href="/confirmation">
              <button
                tw="
              rounded-2xl text-white text-2xl font-bold 
              py-3 px-16 
              bg-purple-500 hover:bg-purple-600 active:bg-purple-700
              focus:outline-none focus:ring focus:ring-purple-400 
              "
              >
                Submit another form
              </button>
            </Link>
          </div>
        </div>
      )}

      <div
        tw="absolute bottom-12 left-12 cursor-pointer"
        onClick={() => {
          router.push("/form");
        }}
      >
        <Buttons.Button buttonType="back" size="normal" />
      </div>
    </div>
  );
};

export default Submission;
