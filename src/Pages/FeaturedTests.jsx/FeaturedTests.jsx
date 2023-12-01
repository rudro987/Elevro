import Loader from "../../Components/Loader";
import useAllTests from "../../Hooks/useAllTests";
import FeaturedTestCard from "./FeaturedTestCard";

const FeaturedTests = () => {
    const [allTests, loading] = useAllTests();
    const featuredTests = allTests?.filter(test => test.bookings > 0);

    if (loading) {
        return <Loader></Loader>
    }
    return (
        <div className="max-w-[90rem] mx-auto w-full lg:py-24">
            <div className="flex flex-col items-center gap-12">
            <h1 className="text-3xl font-semibold text-titleText text-center">Featured Tests</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {
                featuredTests.map(test => <FeaturedTestCard key={test._id} test={test}></FeaturedTestCard>)
            }
            
            </div>
        </div>
        </div>
    );
};

export default FeaturedTests;