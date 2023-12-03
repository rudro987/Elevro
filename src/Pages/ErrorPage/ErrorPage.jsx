import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-[100vh] flex justify-center items-center bg-opacity-100 bg-white dark:bg-[#001420] text-black dark:text-white">
      <div className="text-center">
        <img
          src="https://i.ibb.co/NxJSY36/1581099611064.jpg"
          width={800}
          height={500}
          alt="Error page"
        />
        <div className="flex items-center justify-center pt-10">
          <Link to="/">
            <button className="bg-primary hover:bg-primaryDark  text-white font-semibold text-base py-4 px-7 rounded-lg flex justify-center items-center">
              To Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
