import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const image_api_key = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;
const image_api = `${
  import.meta.env.VITE_IMAGE_HOSTING_API
}?key=${image_api_key}`;

const UpdateProfile = ({ loggedInUser, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    _id,
    name,
    email,
    district,
    subDistrict,
    bloodGroup,
  } = loggedInUser;

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const updatedProfile = {
        name: data.name,
        email: data.email,
        district: data.district,
        image: res.data.data.display_url,
        subDistrict: data.subDistrict,
        bloodGroup: data.bloodGroup,
      };

      const response = await axiosSecure.patch(`/users/profile/${_id}`, updatedProfile);

      if (response.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: `Profile has been successfully updated`,
          icon: "success",
        });
      }
      refetch();
    }
  };
  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">Update your profile</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="text-bodyText">
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text text-lg">User Name</span>
          </label>
          <input
            type="text"
            placeholder="Your Name"
            defaultValue={name}
            {...register("name")}
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex gap-6 mb-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg">Your Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              {...register("email")}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg">Blood Group</span>
            </label>
            <input
              type="text"
              placeholder="Blood Group"
              defaultValue={bloodGroup}
              {...register("bloodGroup")}
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div className="flex gap-6 mb-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg">District</span>
            </label>
            <input
              type="text"
              placeholder="Districts"
              defaultValue={district}
              {...register("district")}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg">Sub District</span>
            </label>
            <input
              type="text"
              placeholder="Sub District"
              defaultValue={subDistrict}
              {...register("subDistrict")}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="form-control w-full my-6">
          <input
            {...register("image", { required: "Please upload an image" })}
            type="file"
            className="file-input w-full max-w-xs bg-menuText focus-visible:outline-none"
          />
          {errors.image && (
            <span className="text-red-700 font-bold mt-2">
              {errors.image.message}
            </span>
          )}
        </div>

        <input
          type="submit"
          value="Update Profile"
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

export default UpdateProfile;
