import Loader from "../../Components/Loader";
import AllTestsCard from "./AllTestsCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const AllTests = () => {
  const axiosPublic = useAxiosPublic();
  const date = new Date();
  const [startDate, setStartDate] = useState('');

  let formatedDate = '';

  if(startDate !== ''){
    formatedDate = startDate.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }

  const { data: allTestsData = [], isPending: loading } = useQuery({
    queryKey: ["allTestsData", formatedDate],
    queryFn: async () => {
      const res = await axiosPublic(`/allTestsData?date=${formatedDate}`);
      return res.data;
    },
  });

  if (loading) {
    return <Loader></Loader>;
  }

  return (<>
  <Helmet>
        <title>Elevro | All Tests</title>
      </Helmet>
  {allTestsData?.length === 0 ? (
    <div className="max-w-[90rem] mx-auto min-h-[50rem] flex flex-col gap-5 items-center justify-center">
      <h1 className="text-center text-4xl font-bold ">No tests found for this date</h1>
    <button className="btn border-none rounded-md bg-primary hover:bg-primaryHover text-white font-bold" onClick={() => setStartDate('')}>Go back</button>
    </div>
  ) : (
    <div className="max-w-[90rem] mx-auto w-full flex flex-col grow gap-10 lg:py-24">
      <h1 className="text-4xl text-center font-bold">
        All Tests
      </h1>
      <div className="relative mb-5 flex gap-5 items-center">
        <h1>Filter by date:</h1>
        <div>
          <DatePicker
            selected={startDate}
            minDate={date}
            onChange={(date) => setStartDate(date)}
            className="input rounded-md h-[35px] input-bordered focus:outline-none bg-[#F5F5F5]"
          />
        </div>
        <div>
          {startDate !== '' && <button className="btn border-none rounded-md bg-primary hover:bg-primaryHover text-white font-bold" onClick={() => setStartDate('')}>Clear selection</button>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {allTestsData && allTestsData.filter(tests => new Date(tests.date) >= new Date()).map((tests) => (
          <AllTestsCard key={tests._id} tests={tests}></AllTestsCard>
        ))}
      </div>
    </div>
  )}
    
    </>
  );
};

export default AllTests;
