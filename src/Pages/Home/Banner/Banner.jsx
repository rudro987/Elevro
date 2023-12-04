import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loader";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const Banner = () => {
  const axiosPublic = useAxiosPublic()
  const {data: activeBanner = {}, isPending: loading} = useQuery({
    queryKey: ['activeBanner'],
    queryFn: async () => {
      const res = await axiosPublic.get('/banners/status?active=true');
      return res.data;
    }
  });

  const couponHandler = (e) => {
    e.preventDefault();
    const coupon = e.target.value;
    navigator.clipboard.writeText(coupon);
    let toolTipText = document.getElementById("myTooltip");
    toolTipText.innerHTML = "Copied to clipboard";
  };

  const toolTip = () => {
    let toolTipText = document.getElementById("myTooltip");
    toolTipText.innerHTML = "Click to copy";
  };

  if(loading){
    return <Loader></Loader>
  }

  return (
    <div className="hero pt-10 lg:pt-40">
      <div className="hero-content flex-col lg:flex-row lg:gap-10">
        <img
          src={activeBanner.image}
          className="w-1/2 h-1/2 rounded-3xl shadow-2xl"
        />
        <div className="text-center lg:text-right">
          <h1 className="text-xl lg:text-4xl font-bold text-menuText">{activeBanner.title}</h1>
          <p className="py-6 text-menuText text-base lg:text-lg font-medium">
            {activeBanner.description}
          </p>
          <div className="pb-6 text-menuText text-lg lg:text-2xl font-medium leading-10">
            <p>For <span className="text-primary font-extrabold">{activeBanner.discount}%</span> flat discount</p>
            <p>
              Click to copy the coupon code :{" "}
              <span className="tooltip">
                <span className="tooltiptext" id="myTooltip">
                  Click to copy
                </span>
                <button
                  value={activeBanner.coupon}
                  className="text-primary hover:text-primaryHover font-bold"
                  name="coupon"
                  onClick={couponHandler}
                  onMouseLeave={toolTip}
                >
                  {activeBanner.coupon}
                </button>
              </span>
            </p>
          </div>
          <Link to="/all-tests">
          <button className="bg-primary border-none text-white hover:bg-primaryHover font-semibold text-lg px-6 py-4 rounded-md">
            See All tests
          </button></Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
