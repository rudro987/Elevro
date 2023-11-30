import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const image_api_key = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;
const image_api = `${
  import.meta.env.VITE_IMAGE_HOSTING_API
}?key=${image_api_key}`;

const DashBoardAddTest = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    const formatedDate = data.date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
    const imageFile = { image: data.image_url[0] };
    const res = await axiosPublic.post(image_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const newTest = {
        test_name: data.test_name,
        date: formatedDate,
        price: parseFloat(data.price),
        bookings: parseFloat(data.bookings),
        image_url: res.data.data.display_url,
        slots: parseFloat(data.slots),
        details: data.details,
      };
      const response = await axiosSecure.post("/addTest", newTest);
      if (response.data.insertedId) {
        reset();
        Swal.fire({
          title: "Success!",
          text: `${data.test_name} has been successfully added`,
          icon: "success",
        });
      }
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-semibold pb-10">Add a New Test</h1>
      <div className="bg-white w-full pt-2 pb-14 px-10 rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full mt-6">
            <label className="label">
              <span className="label-text text-lg">Test Name</span>
            </label>
            <input
              type="text"
              placeholder="Test Name"
              {...register("test_name", { required: "Test name is required" })}
              className="input input-bordered w-full"
            />
            {errors.test_name && (
              <span className="text-red-700 font-bold mt-2">
                {errors.test_name.message}
              </span>
            )}
          </div>
          <div className="flex gap-6">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text text-lg">Last Date</span>
              </label>
              <Controller
                      name="date"
                      control={control}
                      defaultValue={new Date()}
                      rules={{ required: 'Date is required' }}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          selected={field.value}
                          minDate={new Date()}
                          onChange={(date) => {
                            field.onChange(date);
                            setValue("date", date);
                          }}
                          className="input input-bordered w-full"
                        />
                      )}
                    />
              {errors.date && (
                <span className="text-red-700 font-bold mt-2">
                  {errors.date.message}
                </span>
              )}
            </div>

            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text text-lg">Price</span>
              </label>
              <input
                type="number"
                placeholder="Price"
                {...register("price", { required: "Price is required" })}
                className="input input-bordered w-full"
              />
              {errors.price && (
                <span className="text-red-700 font-bold mt-2">
                  {errors.price.message}
                </span>
              )}
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
                {...register("slots", { required: "This field is required" })}
                className="input input-bordered w-full"
              />
              {errors.slots && (
                <span className="text-red-700 font-bold mt-2">
                  {errors.slots.message}
                </span>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-lg">Bookings</span>
              </label>
              <input
                type="number"
                placeholder="Bookings"
                {...register("bookings", {
                  required: "This field is required",
                })}
                className="input input-bordered w-full"
              />
              {errors.bookings && (
                <span className="text-red-700 font-bold mt-2">
                  {errors.bookings.message}
                </span>
              )}
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg">Test Details</span>
            </label>
            <textarea
              {...register("details", {required: "Test Details is required"})}
              className="textarea textarea-bordered h-48"
              placeholder="Test Details"
            ></textarea>
            {errors.details && (
              <span className="text-red-700 font-bold mt-2">
                {errors.details.message}
              </span>
            )}
          </div>

          <div className="form-control w-full my-6">
            <input
              {...register("image_url", { required: true })}
              type="file"
              className="file-input w-full max-w-xs bg-menuText focus-visible:outline-none"
            />
            {errors.image_url && (
              <span className="text-red-700 font-bold mt-2">
                {errors.image_url.message}
              </span>
            )}
          </div>

          <button className="btn bg-primary hover:bg-primaryHover w-full text-menuText font-bold text-lg lg:h-[60px]">Add Test</button>
            
          
        </form>
      </div>
    </div>
  );
};

export default DashBoardAddTest;
