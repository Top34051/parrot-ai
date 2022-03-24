import tw, { styled } from "twin.macro";
import { Form, Field } from "react-final-form";

const onSubmit = (data: any) => {
  console.log(data);
};

const IndexPage = () => (
  <div tw="flex justify-center items-center w-screen h-screen">
    <section>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <h2 tw="text-center">Parrot.ai</h2>
            <div tw="space-x-4">
              <label>Url</label>
              <Field
                name="url"
                component="input"
                placeholder="url"
                validate={(url: string) => {
                  return fetch(url)
                    .then((res) => {
                      return res.status == 200 ? undefined : "Link Invalid";
                    })
                    .catch((err) => "Link Invalid");
                }}
              />
              <button type="submit" tw="border rounded-2xl p-2">
                >>>
              </button>
            </div>
          </form>
        )}
      />
    </section>
  </div>
);

export default IndexPage;
