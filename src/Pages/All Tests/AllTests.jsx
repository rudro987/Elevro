import useAllTests from "../../Hooks/useAllTests";
import Loader from "../../Components/Loader";
import AllTestsCard from "./AllTestsCard";

const AllTests = () => {
  const [allTests, loading] = useAllTests();

  loading && <Loader></Loader>;

  return (
    <div className="max-w-[85rem] mx-auto w-full">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
      {allTests.map((tests) => (
        <AllTestsCard key={tests._id} tests={tests}></AllTestsCard>
      ))}
    </div>
    </div>
  );
};

export default AllTests;
