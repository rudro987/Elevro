import useAllTests from "../../Hooks/useAllTests";
import Loader from "../../Components/Loader";
import AllTestsCard from "./AllTestsCard";

const AllTests = () => {
  const [allTests, loading] = useAllTests();

  if(loading){
    return <Loader></Loader>
  }

  return (
    <div className="max-w-[90rem] mx-auto w-full flex flex-col grow gap-10 lg:py-36">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
      {allTests.map((tests) => (
        <AllTestsCard key={tests._id} tests={tests}></AllTestsCard>
      ))}
    </div>
    </div>
  );
};

export default AllTests;
