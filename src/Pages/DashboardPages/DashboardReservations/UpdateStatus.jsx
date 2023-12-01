import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UpdateStatus = ({ id, refetch }) => {
    const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const reportData = {
        report_link: data.report,
        report_status: "delivered"
    }

    console.log(reportData);
    const res = await axiosSecure.patch(`/allBookings/${id}`, reportData);
    if(res.data.modifiedCount > 0){
        Swal.fire({
            title: "Test report submitted!",
            text: "Reservation status is now Approved.",
            icon: "success"
          });
          refetch();
    }
  };

  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">Update Status </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text text-lg">Report Link</span>
          </label>
          <input
            type="text"
            placeholder="Report Link"
            {...register("report", {required: "Please provide a report link"})}
            className="input input-bordered w-full"
          />
          {errors?.report && (
              <span className="text-red-700 font-bold mt-2">
                {errors.report.message}
              </span>
            )}
        </div>
        <input
          type="submit"
          value="Submit Report"
          className="btn bg-primary hover:bg-primaryHover w-full text-menuText font-bold text-lg lg:h-[60px]"
        />
      </form>
      <div className="modal-action">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <input
            type="submit"
            value="✕"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          />
          <input type="submit" value="close" className="btn" />
        </form>
      </div>
    </div>
  );
};

export default UpdateStatus;
