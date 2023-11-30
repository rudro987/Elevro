import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdPending, MdCancel } from "react-icons/md";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import Swal from "sweetalert2";
import UpdateStatus from "./UpdateStatus";

const DashBoardReservations = () => {
    const axiosSecure = useAxiosSecure();
    const { data: reservations = [], refetch} = useQuery({
        queryKey: ['reservations'],
        queryFn: async () => {
            const res = await axiosSecure('/allBookings')
            return res.data;
        
        }
    })
    const handleDelete = id => {
      Swal.fire({
        title: "Cancel this reservation?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/allBookings/${id}`);
            if(res.data.deletedCount > 0){
                refetch();
                Swal.fire({
                    title: "Canceled!",
                    text: "This reservation has been canceled.",
                    icon: "success"
                  });
            }
        }
      });
    }

    return (
        <div className="bg-white rounded-lg w-full h-full pb-12 pt-5">
      <table className="table table-zebra w-full">
        <thead>
          <tr className="text-center text-blackTest text-sm">
            <th></th>
            <th>Image</th>
            <th>Test Name</th>
            <th>Price</th>
            <th>email</th>
            <th>Last Date</th>
            <th>Report Status</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, idx) => (
            <tr key={reservation._id} className="text-center text-lg">
              <td>{idx + 1}</td>
              <td>
                <div className="flex items-center w-12 h-12 mx-auto">
                  <img src={reservation.image_url} alt="" />
                </div>
              </td>
              <td>{reservation.test_name}</td>
              <td>{reservation.price}</td>
              <td>{reservation.email}</td>
              <td>{reservation.date}</td>
              <td>{reservation.report_status === 'pending' ? ( 
                <button
                  onClick={() =>
                    document.getElementById(`test-update${reservation._id}`).showModal()
                  }
                  className="btn btn-lg bg-primary hover:bg-primaryHover"
                >
                <dialog id={`test-update${reservation._id}`} className="modal modal-bottom sm:modal-middle">
                    <UpdateStatus id={reservation._id} refetch={refetch}></UpdateStatus>
                </dialog>
                  <MdPending className="text-white text-2xl" />
                </button>
              ): (
                <button className="btn btn-lg bg-primary hover:bg-primaryHover">
                  <AiOutlineDeliveredProcedure className="text-white text-2xl" />
                </button>
              )}</td>
              <td>
                <button onClick={() => handleDelete(reservation._id)} className="btn btn-lg bg-secondary hover:bg-secondaryHover">
                  <MdCancel className="text-white text-2xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
};

export default DashBoardReservations;