import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdPending, MdCancel } from "react-icons/md";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import Swal from "sweetalert2";
import UpdateStatus from "./UpdateStatus";
import Loader from "../../../Components/Loader";
import { useForm } from "react-hook-form";
import { useState } from "react";

const DashBoardReservations = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const axiosSecure = useAxiosSecure();

  const {
    data: reservations = [],
    refetch,
    isPending: loading,
  } = useQuery({
    queryKey: ["reservations", searchEmail],
    queryFn: async () => {
      const res = await axiosSecure(`/allBookings?search=${searchEmail}`);
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Cancel this reservation?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/allBookings/${id}`);
        if (res.data.deletedCount > 0) {
          const res = await axiosSecure.patch(`/allTests/adminUpdate/${id}`);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Canceled!",
              text: "This reservation has been canceled.",
              icon: "success",
            });
          }
        }
      }
    });
  };

  const onSubmit = (data) => {
    setSearchEmail(data.search);
    reset();
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-semibold">All Reservations</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-x-5 flex items-center">
            <label className="text-xl font-semibold w-full">
              Search by Email
            </label>
            <input
              type="email"
              {...register("search")}
              className="input rounded-md h-45px] input-bordered focus:outline-none bg-white border-none"
            />
            <button className="btn bg-primary hover:bg-primaryHover text-menuText">
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="bg-white rounded-lg w-full h-full pt-5">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="text-center text-blackTest text-sm">
              <th></th>
              <th>Image</th>
              <th>Test Name</th>
              <th>Price</th>
              <th>email</th>
              <th>Date</th>
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
                <td>${reservation.price}</td>
                <td>{reservation.email}</td>
                <td>{reservation.date}</td>
                <td>
                  {reservation.report_status === "pending" ? (
                    <>
                      <span className="tooltip">
                        <span className="tooltiptext" id="myTooltip">
                          Pending. click to submit
                        </span>
                        <button
                          onClick={() =>
                            document
                              .getElementById(`test-update${reservation._id}`)
                              .showModal()
                          }
                          className="btn btn-lg bg-primary hover:bg-primaryHover"
                        >
                          <dialog
                            id={`test-update${reservation._id}`}
                            className="modal modal-bottom sm:modal-middle"
                          >
                            <UpdateStatus
                              id={reservation._id}
                              refetch={refetch}
                            ></UpdateStatus>
                          </dialog>
                          <MdPending className="text-white text-2xl" />
                        </button>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="tooltip">
                        <span className="tooltiptext" id="myTooltip">
                          Delivered
                        </span>
                        <button className="btn btn-lg bg-primary hover:bg-primaryHover">
                          <AiOutlineDeliveredProcedure className="text-white text-2xl" />
                        </button>
                      </span>
                    </>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(reservation.test_id)}
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

export default DashBoardReservations;
