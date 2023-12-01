import { useQuery } from "@tanstack/react-query";
import { MdPending, MdCancel } from "react-icons/md";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Components/Loader";
import Swal from "sweetalert2";

const UserAppointments = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: userAppointments = [], refetch, isPending: loading} = useQuery({
        queryKey: ['userAppointments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userBookings?email=${user.email}`);
            return res.data;
        }
    })
    const handleDelete = id => {
        Swal.fire({
            title: "Cancel this appointment?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!",
          }).then(async (result) => {
            if (result.isConfirmed) {
              const res = await axiosSecure.delete(`/userBookings/${id}`);
              if (res.data.deletedCount > 0) {
                refetch();
                Swal.fire({
                  title: "Canceled!",
                  text: "This appointment has been canceled.",
                  icon: "success",
                });
              }
            }
          });
    }

    if(loading){
        return <Loader></Loader>
    }

    if(userAppointments.length === 0) return (
        <div className="text-center text-2xl font-semibold">
            <h1>You have not booked for any test yet</h1>
        </div>
    )
    
    return (
        <div>
            <h1 className="text-2xl font-semibold pb-10">My Appointments {userAppointments.length}</h1>
            <div className="bg-white rounded-lg w-full h-full pb-12 pt-5">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="text-center text-blackTest text-sm">
              <th></th>
              <th>Image</th>
              <th>Test Name</th>
              <th>Price</th>
              <th>Report Status</th>
              <th>Date</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {userAppointments.map((appointment, idx) => (
              <tr key={appointment._id} className="text-center text-lg">
                <td>{idx + 1}</td>
                <td>
                  <div className="flex items-center w-12 h-12 mx-auto">
                    <img src={appointment.image_url} alt="" />
                  </div>
                </td>
                <td>{appointment.test_name}</td>
                <td>{appointment.price}</td>
                <td>{
                    appointment.report_status === 'pending' ? (
                        <button  className="btn btn-lg bg-primary hover:bg-primaryHover">
                        <MdPending className="text-white text-2xl" />
                        </button>
                ) : (
                    <button  className="btn btn-lg bg-primary hover:bg-primaryHover">
                        <AiOutlineDeliveredProcedure className="text-white text-2xl" />
                        </button>
                )
                }</td>
                <td>{appointment.date}</td>

                <td>
                  <button
                    onClick={() => handleDelete(appointment._id)}
                    className="btn btn-lg bg-secondary hover:bg-secondaryHover"
                  >
                    <MdCancel className="text-white text-2xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default UserAppointments;