import tw from "twin.macro";
import { useState, useEffect } from "react";
import useStore from "../store";
import config from "../config/index";
import { CgSpinner } from "react-icons/cg";

const Submission = () => {
  const [isSending, setIsSending] = useState(true);
  const { answers } = useStore();

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
    })
      .then((res) => setIsSending(!(res.status == 200)))
      .catch(console.log);
  }, [answers]);

  return (
    <div tw="w-screen h-screen flex justify-center items-center">
      
      <section tw="absolute top-12 right-12">
        <h1 tw="text-xl font-semibold tracking-tight">Parrot.AI</h1>
      </section>

      <p tw="text-6xl font-bold"> Your form has been submitted.</p>

    </div>
  );
};

export default Submission;
