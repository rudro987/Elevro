import { RingLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="w-full grow flex justify-center items-center flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
        <div className="flex justify-center">
          <RingLoader color="#36d7b7" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
