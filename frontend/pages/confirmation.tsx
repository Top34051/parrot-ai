import tw from "twin.macro";

const Confirmation = () => {
  return (
    <div tw="h-screen w-screen flex items-center justify-center">
      <section>
        <h1 tw="text-purple-700 text-3xl">Confirmation</h1>
        <div>some random text super long</div>
        <button tw="rounded-2xl px-2 py-1 bg-green-400 text-white">
          START
        </button>
      </section>
    </div>
  );
};

export default Confirmation;
