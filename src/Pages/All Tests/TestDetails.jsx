import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader";

const TestDetails = () => {
  const { id } = useParams();

  const axiosPublic = useAxiosPublic();
  const { data: singleTest, isLoading } = useQuery({
    queryKey: ["singleTest"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/allTests/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="max-w-[85rem] mx-auto flex flex-col gap-10 grow w-full lg:py-36">
      <div className="inline-flex justify-center">
        <img src={singleTest.image_url} alt={singleTest.test_name} className="rounded-xl" />
      </div>
      <div>
        <h1 className="text-3xl">Test name: {singleTest.test_name}</h1>
        <p>
            Price: ${singleTest.price}
        </p>
        <p>
            Slots: {singleTest.slots} spots left.
        </p>
        <p>
            Last date: {singleTest.date}
        </p>
        <p>
            Total Bookings: {singleTest.bookings}
        </p>
        <p>
            Test Details: {singleTest.details}
        </p>
        <button className="btn border-none rounded-md bg-secondary hover:bg-secondaryHover text-white font-bold">Book a spot now</button>
      </div>
    </div>
  );
};

export default TestDetails;
