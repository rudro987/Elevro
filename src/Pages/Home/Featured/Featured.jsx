import useAllTests from "../../../Hooks/useAllTests";
import FeaturedCard from "./FeaturedCard";
import Loader from "../../../Components/Loader";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Featured = () => {
    const [allTests, loading] = useAllTests();
    const featuredTests = allTests?.filter(test => test.bookings > 0);

    if(loading){
        return <Loader></Loader>
    }

    return (
        <div className="flex flex-col items-center gap-12">
            <h1 className="text-3xl font-semibold text-titleText text-center">Our Featured Tests</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {
                featuredTests.slice(0, 3).map(test => <FeaturedCard key={test._id} test={test}></FeaturedCard>)
            }
            
            </div>
            <Link to="/featured-tests" className="text-2xl font-medium text-secondary hover:text-secondaryHover flex gap-3 items-center"><FaArrowRightLong />View All Featured Test</Link>
        </div>
    );
};

export default Featured;