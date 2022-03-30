import tw, { styled } from "twin.macro";
import { Form, Field } from "react-final-form";
import { useEffect, useState } from "react";
import useStore from "../store";

const IndexPage = () => {
  const [inputDat, setInputDat] = useState<string>("");
  const [urlNVal, isUrlNVal] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const { setUrl } = useStore();

  const onSubmit = (data: any) => {
    setInputDat(data.url);
  };

  useEffect(() => {
    if (!isCheck) {
      fetch(
        "http://localhost:8000/is_valid_url?" +
          new URLSearchParams({ url: inputDat }).toString()
      )
        .then((res) => {
          setIsCheck(res.status === 200);
          setUrl(inputDat);
        })
        .catch(console.log);
    } else {
      fetch(
        `http://localhost:8000/forms?` +
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
          console.log(res);
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
              <h2 tw="text-center">Parrot.ai</h2>
              <div tw="space-x-4">
                <label>Url</label>
                <Field name="url" component="input" placeholder="url" />
                <button type="submit" tw="border rounded-2xl p-2">
                  {">>>"}
                </button>
              </div>
            </form>
          )}
        />
      </section>
    </div>
  );
};

export default IndexPage;
