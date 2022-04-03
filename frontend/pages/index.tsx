import tw, { styled } from "twin.macro";
import { Form, Field } from "react-final-form";
import { useEffect, useState } from "react";
import useStore from "../store";
import { useRouter } from "next/router";
import { CgSpinner } from "react-icons/cg";

const config = require('../config')


const Index = () => {

  const router = useRouter();
  const [inputUrl,  setinputUrl]  = useState<string>("");
  const [isValid,   setIsValid]   = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUrl, formData, setFormData } = useStore();

  const onSubmit = (data: any) => {
    setinputUrl(data.url);
  };

  useEffect(() => {

    if (!isValid) {

      const apiEndpoint = config.apiUrl + '/is_valid_url'
      const url = apiEndpoint + '?' + new URLSearchParams({ url: inputUrl }).toString()
      
      fetch(url).then((res) => {
        setIsValid(res.status === 200);
        setUrl(inputUrl);
      })
      .catch(console.log);
    } 
  
    if (isValid && !formData) {

      const apiEndpoint = config.apiUrl + '/forms'
      const url = apiEndpoint + '?' + new URLSearchParams({ url: inputUrl }).toString()

      setIsLoading(true);
      fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-type": "application/json",
          accept: "application/json",
        },
      })
      .then((res) => res.json())
      .then((res) => {
        setFormData(res);
        setTimeout(() => {
          router.push("/confirmation");
        }, 1000);
        setIsLoading(false);
      })
      .catch(console.error);
    }
  }, [inputUrl, isValid]);

  return (
    <div tw="flex justify-center items-center w-screen h-screen">
      <section>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} tw='space-y-20'>
              <h2 tw="text-center text-8xl tracking-tight font-bold">Parrot.AI 🦜</h2>
              <div tw="space-x-3 flex justify-center">

                <Field
                  name="url"
                  component="input"
                  placeholder="Enter Google Form URL"
                  tw="text-xl rounded-2xl border bg-gray-100 p-2 pl-4 w-128 flex"
                />

                {/* Not submitted and not loading */}
                {!formData && !isLoading && <button
                  tw="
                    flex items-center
                    text-white text-xl font-semibold 
                    py-2 px-4 rounded-2xl 
                    bg-purple-600 hover:bg-purple-700 active:bg-purple-800
                    focus:outline-none focus:ring focus:ring-purple-300 
                  "
                >
                  {"Fill form"}
                </button>}

                {/* Not submitted but loading */}
                {!formData && isLoading && <div
                  tw="
                    flex items-center space-x-2
                    text-white text-xl font-semibold 
                    py-2 px-4 rounded-2xl 
                    bg-gray-500
                  "
                >
                  <CgSpinner tw="animate-spin w-5 h-5"/>
                  <p>Loading...</p>
                </div>}

                {/* Submitted */}
                {formData && <div
                  tw="
                    flex items-center
                    text-white text-xl font-semibold 
                    py-2 px-4 rounded-2xl
                    bg-green-500
                  "
                >
                  {"Form loaded "}
                </div>}
              </div>
            </form>
          )}
        />
      </section>
    </div>
  );
};

export default Index;
