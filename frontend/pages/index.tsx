import tw, { styled } from "twin.macro";
import { Form, Field } from "react-final-form";
import { useEffect, useState } from "react";
import useStore from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
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
            router.push("/Question");
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
              <h2 tw="text-center text-xl font-mono">Parrot.ai</h2>
              <div tw="space-x-4">
                <label tw="text-lg font-mono">Url</label>
                <Field name="url" component="input" placeholder="url" />
                <button type="submit" tw="border rounded-2xl p-2 text-lg">
                  {">>>"}
                </button>
              </div>
            </form>
          )}
        />
        {formData && <p tw="text-green-600">Information Loaded</p>}
        {isLoading && <IsLoadingComp />}
      </section>
      {/* <div tw="absolute bottom-10 right-0 pr-32 pb-4 cursor-pointer">
        <Link href="/Question">
          <FontAwesomeIcon icon={faArrowRight} size="4x" />
        </Link>
      </div> */}
    </div>
  );
};

export default IndexPage;
