import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const image_api_key = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;
const image_api = `${
  import.meta.env.VITE_IMAGE_HOSTING_API
}?key=${image_api_key}`;

const DaashBoardAddBanner = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
      const newBanner = {
        title: data.title,
        description: data.description,
        discount: parseFloat(data.discount),
        image: res.data.data.display_url,
        coupon: data.coupon,
        active: false
      };

      const response = await axiosSecure.post("/addBanner", newBanner);
      
      if (response.data.insertedId) {
        reset();
        Swal.fire({
          title: "Success!",
          text: `Banner has been successfully added`,
          icon: "success",
        });
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold pb-10">Add a New Banner</h1>
      <div className="bg-white w-full pt-2 pb-14 px-10 rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full mt-6">
            <label className="label">
              <span className="label-text text-lg">Banner Title</span>
            </label>
            <input
              type="text"
              placeholder="Banner title"
              {...register("title", { required: "Title is required" })}
              className="input input-bordered w-full"
            />
            {errors.title && (
              <span className="text-red-700 font-bold mt-2">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="flex gap-6">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text text-lg">Banner Description</span>
              </label>
              <input
                type="text"
                placeholder="Banner Description"
                {...register("description", {
                  required: "description is required",
                })}
                className="input input-bordered w-full"
              />
              {errors.description && (
                <span className="text-red-700 font-bold mt-2">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-6 mb-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-lg">Discount</span>
              </label>
              <input
                type="text"
                placeholder="Discount amount"
                {...register("discount", {
                  required: "This field is required",
                })}
                className="input input-bordered w-full"
              />
              {errors.discount && (
                <span className="text-red-700 font-bold mt-2">
                  {errors.discount.message}
                </span>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-lg">Coupon Code</span>
              </label>
              <input
                type="text"
                placeholder="Coupon code"
                {...register("coupon", {
                  required: "This field is required",
                })}
                className="input input-bordered w-full"
              />
              {errors.coupon && (
                <span className="text-red-700 font-bold mt-2">
                  {errors.coupon.message}
                </span>
              )}
            </div>
          </div>

          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs bg-menuText focus-visible:outline-none"
            />
            {errors.image && (
              <span className="text-red-700 font-bold mt-2">
                {errors.image.message}
              </span>
            )}
          </div>

          <button className="btn bg-primary hover:bg-primaryHover w-full text-menuText font-bold text-lg lg:h-[60px]">
            Add Banner
          </button>
        </form>
      </div>
    </div>
  );
};

export default DaashBoardAddBanner;
