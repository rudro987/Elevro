import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const TestDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: singleTest, isLoading, refetch } = useQuery({
    queryKey: ["singleTest"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/allTests/${id}`);
      return res.data;
    },
  });

  const handleBookNow = async (test) => {
    console.log(test);
    
    if(user?.email){
        const bookedTest = {
            test_id: test._id,
            test_name: test.test_name,
            price: test.price,
            date: test.date,
            image_url: test.image_url,
            email: user.email,
            report_status: 'pending'
        }
        await axiosPublic.post('/bookedTest', bookedTest)
        .then(async (res) => {
            if(res.data.insertedId){
                await axiosPublic.patch(`/allTests/${test._id}`)
                .then(res => {
                    console.log(res.data);
                    refetch();
                    if(res.data.modifiedCount > 0){
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `Your booking of ${test.test_name} test is successful!`,
                            showConfirmButton: false,
                            timer: 1500
                          });
                    }
                })
                
            }
        })
        
    }else{
        Swal.fire({
            title: "You are not logged in",
            text: "Please login to add to the cart!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Login Now"
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login", {state: {from: location}});
            }
          });
    }
    
  }

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
            Date: {singleTest.date}
        </p>
        <p>
            Total Bookings: {singleTest.bookings}
        </p>
        <p>
            Test Details: {singleTest.details}
        </p>
        {
            singleTest.slots > 0 ? <button onClick={() => handleBookNow(singleTest)} className="btn border-none rounded-md bg-secondary hover:bg-secondaryHover text-white font-bold">Book Now</button>
            :
            <button className="btn btn-disabled">No slot available</button>
        }
      </div>
    </div>
  );
};

export default TestDetails;
