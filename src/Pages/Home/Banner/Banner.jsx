const Banner = () => {

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

  return (
    <div className="hero pt-40">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div className="text-right">
          <h1 className="text-5xl font-bold text-menuText">Box Office News!</h1>
          <p className="py-6 text-menuText text-lg font-medium">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <div className="pb-6 text-menuText text-2xl font-medium leading-10">
            <p>For 20% flat discount</p>
            <p>
              Click to copy the coupon code :{" "}
              <span className="tooltip">
                <span className="tooltiptext" id="myTooltip">
                  Click to copy
                </span>
                <button
                  value="ELEVRO-NOV"
                  className="text-secondary font-bold"
                  name="coupon"
                  onClick={couponHandler}
                  onMouseLeave={toolTip}
                >
                  ELEVRO-NOV
                </button>
              </span>
            </p>
          </div>
          <button className="bg-secondary border-none text-white hover:bg-secondaryHover font-semibold text-lg px-6 py-4 rounded-md">
            See All tests
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
