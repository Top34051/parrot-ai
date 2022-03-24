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
            <h2>Simple Default Input</h2>
            <div tw="space-x-4">
              <label>First Name</label>
              <Field
                name="firstName"
                component="input"
                placeholder="First Name"
                validate={(url: string) => {
                  console.log(url);
                  return fetch(url)
                    .then((res) =>
                      res.status == 200 ? undefined : "Link Invalid"
                    )
                    .catch((err) => "Link Invalid");
                }}
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        )}
      />
    </section>
  </div>
);

export default IndexPage;
