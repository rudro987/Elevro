import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader";
import useAuth from "../../Hooks/useAuth";
import { loadStripe } from "@stripe/stripe-js";
import BookNowForm from "./BookNowForm";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const TestDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: singleTest,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["singleTest"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/allTests/${id}`);
      return res.data;
    },
  });

  const { data: existingBookings = []} = useQuery({
    queryKey: ["existingBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookedTest/${user.email}`);
      return res.data;
    }
  });

  const bookingExists = existingBookings?.some(
    (booking) => booking.test_id === id)

    console.log(bookingExists);

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="max-w-[85rem] mx-auto flex flex-col gap-10 grow w-full lg:py-24">
      <h1 className="text-4xl text-center font-bold">
        {singleTest.test_name} Details
      </h1>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row gap-20">
          <img
            src={singleTest.image_url}
            className="max-w-2xl rounded-lg shadow-2xl"
            alt={singleTest.test_name}
          />
          <div>
            <h1 className="text-2xl font-bold">
              Test name: {singleTest.test_name}
            </h1>
            <p className="py-3">{singleTest.details}</p>
            <div className="flex gap-5 w-1/2 pb-3">
              <p className="">
                <span className="font-semibold">Price:</span> $
                {singleTest.price}
              </p>
              <p className="">
                <span className="font-semibold">Date: </span>
                {singleTest.date}
              </p>
            </div>
            <div className="flex gap-5 w-1/2 pb-3">
              <p className="">
                <span className="font-semibold">Slots Left: </span>
                {singleTest.slots}
              </p>
              <p className="">
                <span className="font-semibold">Bookings: </span>
                {singleTest.bookings}
              </p>
            </div>
            {bookingExists ? (
              <button disabled className="btn btn-dark">Already booked</button>
            ) : (
              <button
              className="btn bg-secondary hover:bg-secondaryHover text-menuText font-semibold"
            >
              <dialog
                id={`book-now-${singleTest._id}`}
                className="modal modal-bottom sm:modal-middle"
              >
                <Elements stripe={stripePromise}>
                  <BookNowForm
                    user={user}
                    singleTest={singleTest}
                    refetch={refetch}
                  ></BookNowForm>
                </Elements>
              </dialog>
              Book Now
            </button>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetails;
