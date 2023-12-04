import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import Featured from "./Featured/Featured";
import Recommendations from "./Recommendations/Recommendations";

const Home = () => {
  return (
    <>
    <div className="bg-[url('https://i.ibb.co/f1Hgkzb/abstract-colorful-background-with-place-for-text-blurred-gradient-backdrop-illustration-for-your-gra.jpg')] w-full h-[720px]"><Banner></Banner></div>
    <div className="max-w-[90rem] mx-auto w-full lg:py-36">
      <Helmet>
        <title>Elevro | Home</title>
      </Helmet>
      <h1>This is Home</h1>
      <Featured></Featured>
      <Recommendations></Recommendations>
      
    </div>
    </>
  );
};

export default Home;
