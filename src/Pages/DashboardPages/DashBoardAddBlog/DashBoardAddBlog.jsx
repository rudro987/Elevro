import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import "react-datepicker/dist/react-datepicker.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const image_api_key = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;
const image_api = `${
  import.meta.env.VITE_IMAGE_HOSTING_API
}?key=${image_api_key}`;

const DashBoardAddBlog = () => {
  const [content, setContent] = useState("");
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
      const newPost = {
        title: data.title,
        content: content,
        image: res.data.data.display_url,
      };
      const response = await axiosSecure.post("/addBlog", newPost);
      if (response.data.insertedId) {
        reset();
        setContent("");
        Swal.fire({
          title: "Success!",
          text: `New Blog Post has been successfully added`,
          icon: "success",
        });
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>Elevro | Dashboard | Add Blog</title>
      </Helmet>
      <h1 className="text-2xl font-semibold pb-10">Add a new blog post</h1>
      <div className="bg-white w-full pt-2 pb-14 px-10 rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-lg">Blog Title</span>
            </label>
            <input
              type="text"
              placeholder="Title of the blog post"
              {...register("title", { required: "Title is required" })}
              className="input input-bordered w-full"
            />
            {errors.title && (
              <span className="text-red-700 font-bold mt-2">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="form-control pb-14">
            <label className="label">
              <span className="label-text text-lg">Blog Content</span>
            </label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={(value) => setContent(value)}
              className="h-80"
            />
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
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashBoardAddBlog;
