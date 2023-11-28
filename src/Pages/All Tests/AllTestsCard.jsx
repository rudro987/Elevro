import { Link } from "react-router-dom";

const AllTestsCard = ({ tests }) => {
  const { _id, test_name, image_url, details, price, date, slots } = tests;

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image_url} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{test_name}</h2>
        <p>{details}</p>
        <p>{price}</p>
        <p>{date}</p>
        <p>{slots}</p>
        <div className="card-actions justify-end">
          <Link to={`/all-tests/${_id}`}>
          <button
            className="btn border-none rounded-md bg-secondary hover:bg-secondaryHover text-white font-bold"
          >
            View Details
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllTestsCard;
