import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";

const Home = () => {
  return (
    <>
    <div className="bg-primary w-full h-[720px]"><Banner></Banner></div>
    <div className="max-w-[90rem] mx-auto w-full lg:py-36">
      <Helmet>
        <title>Elevro | Home</title>
      </Helmet>
      <h1>This is Home</h1>
      
    </div>
    </>
  );
};

export default Home;
