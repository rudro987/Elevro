import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import Featured from "./Featured/Featured";
import Recommendations from "./Recommendations/Recommendations";
import FeaturedSection from "./FeaturedSection/FeaturedSection";
import Promotions from "./Promotions";

const Home = () => {
  return (
    <>
    <div className="bg-[url('https://i.ibb.co/f1Hgkzb/abstract-colorful-background-with-place-for-text-blurred-gradient-backdrop-illustration-for-your-gra.jpg')] w-full lg:h-[720px]"><Banner></Banner></div>
    <div className="max-w-[90rem] mx-auto w-full lg:py-36">
      <Helmet>
        <title>Elevro | Home</title>
      </Helmet>
      <FeaturedSection></FeaturedSection>
      <Featured></Featured>
      <Promotions></Promotions>
      <Recommendations></Recommendations>
    </div>
    </>
  );
};

export default Home;
