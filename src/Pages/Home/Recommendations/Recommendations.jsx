import useBlogs from "../../../Hooks/useBlogs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import RecommendationsCard from "./RecommendationsCard";
import Loader from "../../../Components/Loader";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Recommendations = () => {
  const [allBlogs, loading] = useBlogs();
  
  return (
    <>
    {loading && <Loader></Loader>}
    <div>
      <h1 className="text-3xl font-semibold text-titleText text-center">
        Recommendations
      </h1>
      <div className="my-20 overflow-hidden">
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          className="flex flex-col lg:flex-row"
        >
          {
            allBlogs.map(blog => <SwiperSlide key={blog._id}>
            <RecommendationsCard blog={blog}></RecommendationsCard>
            </SwiperSlide>)
          }
        </Swiper>
      </div>
      <div className="flex justify-center items-center">
      <Link to="/blog" className="text-2xl font-medium text-secondary hover:text-secondaryHover flex gap-3 items-center pb-20 lg:pb-0"><FaArrowRightLong />View All Blog Posts</Link>
      </div>
    </div>
    </>
  );
};

export default Recommendations;
