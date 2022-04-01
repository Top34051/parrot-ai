import tw, { styled } from "twin.macro";
import { Form, Field } from "react-final-form";
import { useEffect, useState } from "react";
import useStore from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";

const IsLoadingComp = () => {
  return <div></div>;
};

const IndexPage = () => {
  const [inputDat, setInputDat] = useState<string>("");
  const [isCheck, setIsCheck] = useState(false);
  const { setUrl, formData, setFormData } = useStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: any) => {
    setInputDat(data.url);
  };

  useEffect(() => {
    if (!isCheck) {
      fetch(
        "https://parrot-ai-gg.uc.r.appspot.com/is_valid_url?" +
          new URLSearchParams({ url: inputDat }).toString()
      )
        .then((res) => {
          setIsCheck(res.status === 200);
          setUrl(inputDat);
        })
        .catch(console.log);
    } else if (!formData) {
      setIsLoading(true);
      fetch(
        `https://parrot-ai-gg.uc.r.appspot.com/forms?` +
          new URLSearchParams({ url: inputDat }).toString(),
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-type": "application/json",
            accept: "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setFormData(res);
          setTimeout(() => {
            router.push("/Instruction");
          }, 1000);
          setIsLoading(false);
        })
        .catch(console.error);
    }
  }, [inputDat, isCheck]);

  return (
    <div tw="flex justify-center items-center w-screen h-screen">
      <section>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div tw="w-full flex justify-center">
                <img src="/logo.png" tw="h-48 w-48" />
              </div>
              <h2 tw="text-center text-4xl font-bold">Parrot.Ai</h2>
              <div tw="mt-10 space-x-11">
                <label tw="text-lg">Url</label>
                <Field
                  name="url"
                  component="input"
                  placeholder="url"
                  tw="text-gray-700 text-lg font-bold mb-2"
                />
                <button
                  type="submit"
                  tw="text-lg font-bold py-2 px-4 rounded bg-blue-500 text-white"
                >
                  {"Start"}
                </button>
              </div>
            </form>
          )}
        />
        {formData && <p tw="text-green-600">Information Loaded</p>}
        {isLoading && <IsLoadingComp />}
      </section>
    </div>
  );
};

export default IndexPage;
