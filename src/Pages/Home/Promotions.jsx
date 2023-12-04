import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loader from "../../Components/Loader";

const Promotions = () => {
  const axiosPublic = useAxiosPublic();
  const { data: promotions = {}, isPending: loading } = useQuery({
    queryKey: ["promotions"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banners/status?active=true");
      return res.data;
    },
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

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="w-full bg-primary rounded-md py-20 mb-20 flex justify-center items-center">
      <div className="w-1/2 h-full space-y-5 flex flex-col items-center justify-end pl-24">
        <h1 className="text-5xl text-menuText font-bold text-center">
          Get {promotions.discount}% Discount
        </h1>
        <p className="text-2xl text-white text-center">
          Use the Coupon code by click and copy
        </p>
      </div>
      <div className="w-1/2 h-full flex items-center justify-center">
        <span className="tooltip">
          <span className="tooltiptext" id="myTooltip">
            Click to copy
          </span>
          <button
            value={promotions.coupon}
            onClick={couponHandler}
            onMouseLeave={toolTip}
            className="bg-secondary hover:bg-secondaryHover text-xl font-bold text-white rounded-xl px-8 py-5"
          >
            {promotions.coupon}
          </button>
        </span>
      </div>
    </div>
  );
};

export default Promotions;
