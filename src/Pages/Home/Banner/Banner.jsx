import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    
  return (
    <Carousel>

      <div>
        <img src={''} />
        <p className="legend">Legend 1</p>
      </div>

      <div>
        <img src={''} />
        <p className="legend">Legend 2</p>
      </div>

      <div>
        <img src={'img3'} />
        <p className="legend">Legend 3</p>
      </div>

    </Carousel>
  );
};

export default Banner;
