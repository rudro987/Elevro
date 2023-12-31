import { Link } from "react-router-dom";
import { FaDollarSign } from "react-icons/fa";
import { RiReservedFill } from "react-icons/ri";
import { MdOutlineDateRange } from "react-icons/md";
import { FaCheckToSlot } from "react-icons/fa6";


const AllTestsCard = ({ tests }) => {
  const { _id, test_name, image_url, details, price, date, slots, bookings } = tests;

  return (
    <div className="card w-96 border rounded-xl border-[#E6E6E6]">
      <figure className="px-5 pt-5">
        <img src={image_url} alt={test_name} className="rounded-xl" />
      </figure>
      <div className="flex flex-col gap-4 justify-center p-7">
        <h2 className="card-title">{test_name}</h2>
        <p>
          {details.slice(0, 50)}...{" "}
          <Link
            to={`/featured-tests/${_id}`}
            className="text-primary hover:text-primaryHover"
          >
            read more
          </Link>
        </p>
        <div className="grid grid-cols-2">
          <div className="pt-5 flex gap-1 items-center">
            <FaDollarSign className="text-secondary text-base" />
            <p className="text-sm text-bodyText">Price: {price} USD</p>
          </div>
          <div className="pt-5 flex gap-2 items-center">
            <RiReservedFill className="text-secondary text-base" />
            <p className="text-sm text-bodyText">
              {" "}
              Reservations: {bookings}
            </p>
          </div>
          <div className="pt-5 flex gap-2 items-center">
            <MdOutlineDateRange className="text-secondary text-base" />
            <p className="text-sm text-bodyText"> Date: {date}</p>
          </div>
          <div className="pt-5 flex gap-2 items-center">
            <FaCheckToSlot className="text-secondary text-base" />
            <p className="text-sm text-bodyText"> Slots: {slots}</p>
          </div>
        </div>
        <div className="card-actions text-center">
          <Link
            to={`/all-tests/${_id}`}
            className="bg-primary py-3 hover:bg-primaryHover w-full rounded-lg text-menuText text-lg font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllTestsCard;
