import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const image_api_key = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;
const image_api = `${
  import.meta.env.VITE_IMAGE_HOSTING_API
}?key=${image_api_key}`;

const UpdateTest = ({ test, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image_url[0] };
      const res = await axiosPublic.post(image_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        const newTest = {
            test_name: data.test_name,
            price: parseFloat(data.price),
            bookings: parseFloat(data.bookings),
            image_url: res.data.data.display_url,
            slots: parseFloat(data.slots),
            details: data.details,
          };
      
          const response = await axiosSecure.put(`/allTests/${test._id}`, newTest);
      
          if (response.data.modifiedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: `${data.test_name} has been successfully added`,
              icon: "success",
            });
            
          }
          refetch();
      }

    
  };

  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">Update {test.test_name}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full mt-6">
          <label className="label">
            <span className="label-text text-lg">Test Name</span>
          </label>
          <input
            type="text"
            placeholder="Test Name"
            defaultValue={test.test_name}
            {...register("test_name")}
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex gap-6">
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-lg">Price</span>
            </label>
            <input
              type="number"
              placeholder="Price"
              defaultValue={test.price}
              {...register("price")}
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div className="flex gap-6 mb-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg">Slots</span>
            </label>
            <input
              type="number"
              placeholder="Available slots"
              defaultValue={test.slots}
              {...register("slots")}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg">Bookings</span>
            </label>
            <input
              type="number"
              placeholder="Bookings"
              defaultValue={test.bookings}
              {...register("bookings")}
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg">Test Details</span>
          </label>
          <textarea
            {...register("details")}
            className="textarea textarea-bordered h-48"
            placeholder="Test Details"
            defaultValue={test.details}
          ></textarea>
        </div>

        <div className="form-control w-full my-6">
          <input
            {...register("image_url", {required: "Please upload an image"})}
            type="file"
            className="file-input w-full max-w-xs bg-menuText focus-visible:outline-none"
          />
          {errors.image_url && (
              <span className="text-red-700 font-bold mt-2">
                {errors.image_url.message}
              </span>
            )}
        </div>

        <input
          type="submit"
          value="Add Test"
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

export default UpdateTest;
