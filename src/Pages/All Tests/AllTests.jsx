import Loader from "../../Components/Loader";
import AllTestsCard from "./AllTestsCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import ReactPaginate from 'react-paginate';

const AllTests = () => {
  const axiosPublic = useAxiosPublic();
  const date = new Date();
  const [testsData, setTestsData] = useState([]);
  const [startDate, setStartDate] = useState('');

  const { data: allTestsData = [], isPending: loading } = useQuery({
    queryKey: ["allTests"],
    queryFn: async () => {
      const res = await axiosPublic(`/allTestsData`);
      return res.data;
    },
  });

  useEffect(() => {
    if(startDate === ''){
      setTestsData(allTestsData);
    }else {
      const filteredTests = allTestsData.filter(test => {
        const testDate = new Date(test.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
        return testDate === startDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
      });
      setTestsData(filteredTests);
    }
  }, [allTestsData, startDate]);
  
  function PaginatedTests({ testsPerPage, testsData }) {
    const [currentTests, setCurrentTests] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [testOffset, setTestOffset] = useState(0);
  
    useEffect(() => {
      const endOffset = testOffset + testsPerPage;
      setCurrentTests(testsData.slice(testOffset, endOffset));
      setPageCount(Math.ceil(testsData.length / testsPerPage));
    }, [testOffset, testsPerPage, testsData]);
  
    const handlePageClick = ({ selected }) => {
      const newOffset = selected * testsPerPage;
      setTestOffset(newOffset);
    };
  
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentTests.map((test) => (
            <AllTestsCard key={test._id} tests={test}></AllTestsCard>
          ))}
        </div>
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel="..."
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          activeClassName="active"
          previousClassName="page-item"
          nextClassName="page-item"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageClassName="page-item"
          pageLinkClassName="page-link"
        />
      </>
    );
  }
  


  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <>
      <Helmet>
        <title>Elevro | All Tests</title>
      </Helmet>
      {testsData?.length === 0 ? (
        <div className="max-w-[90rem] mx-auto min-h-[50rem] flex flex-col gap-5 items-center justify-center">
          <h1 className="text-center text-4xl font-bold ">
            No tests found for this date
          </h1>
          <button
            className="btn border-none rounded-md bg-primary hover:bg-primaryHover text-white font-bold"
            onClick={() => setStartDate('')}
          >
            Go back
          </button>
        </div>
      ) : (
        <div className="max-w-[90rem] mx-auto w-full flex flex-col grow gap-10 py-24">
          <h1 className="text-4xl text-center font-bold">All Tests</h1>
          <div className="flex flex-col items-center gap-12">
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
                {startDate !== "" && (
                  <button
                    className="btn border-none rounded-md bg-primary hover:bg-primaryHover text-white font-bold"
                    onClick={() => setStartDate("")}
                  >
                    Clear selection
                  </button>
                )}
              </div>
            </div>
            <PaginatedTests testsPerPage={6} testsData={testsData}></PaginatedTests>
          </div>
        </div>
      )}
    </>
  );
};

export default AllTests;
