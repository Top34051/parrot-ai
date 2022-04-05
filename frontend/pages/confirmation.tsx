import tw from "twin.macro";
import useStore from "../store";
import Link from "next/link";
import Head from "next/head";

const Confirmation = () => {
  const { formData } = useStore();

  return (
    <div tw="h-screen w-screen flex items-center justify-center">
      <Head>
        <title>Parrot.ai</title>
      </Head>
      <section tw="absolute top-12 right-12">
        <h1 tw="text-xl font-semibold tracking-tight">Parrot.AI</h1>
      </section>

      <section tw="space-y-12 justify-center">
        <div tw="space-y-3 text-center">
          <h1 tw="text-7xl font-bold tracking-tight">{formData?.title}</h1>
          <p tw="text-lg font-semibold">{formData?.description}</p>
        </div>
        <div tw="flex justify-center">
          <Link href="/instruction">
            <button
              tw="
              rounded-2xl text-white text-2xl font-bold 
              py-3 px-16 
              bg-purple-500 hover:bg-purple-600 active:bg-purple-700
              focus:outline-none focus:ring focus:ring-purple-400 
              "
            >
              Click here to proceed
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Confirmation;
