import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";

const Home = () => {
  return (
    <>
    <div className="bg-primary w-full h-[720px]"><Banner></Banner></div>
    <div className="max-w-[85rem] mx-auto">
      <Helmet>
        <title>Elevro | Home</title>
      </Helmet>
      <h1>This is Home</h1>
      
    </div>
    </>
  );
};

export default Home;
