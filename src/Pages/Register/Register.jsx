import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../Components/Loader";

const image_api_key = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;
const image_api = `${import.meta.env.VITE_IMAGE_HOSTING_API}?key=${image_api_key}`;

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { user, createNewUser, updateUser, loading } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const response = await axios.get("districts.json");
      return response.data;
    },
  });

  const { data: subDisctricts = [] } = useQuery({
    queryKey: ["subDistricts"],
    queryFn: async () => {
      const response = await axios.get("subDisctricts.json");
      return response.data;
    },
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const password = watch("password");

  const onSubmit = async (data) => {
    const imageFile = {
      image: data.image[0],
    };
    const res = await axiosPublic.post(image_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const image_url = res.data.data.display_url; 

    createNewUser(data.email, data.password).then((result) => {
      
      if(result){
        updateUser(data.name, image_url)
        .then(() => {
          const userInfo = { name: data.name, email: data.email, image: image_url, bloodGroup: data.bloodGroup, district: data.district, subDistrict: data.subDistrict, password: data.password, role:"user", status: "active"};
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) { 
              reset();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Registration successful!",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => console.log(error));
      }
      
    }).catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        reset();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This email is already in use. Please use a different email.",
        });
        navigate("/register");
      } else {
        console.error("Firebase authentication error:", error);
        reset();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred during registration. Please try again later.",
        });
        navigate("/register");
      }
    });
  };

  if(user){
    return navigate("/dashboard")
  }

  if(loading){
    return <Loader></Loader>
  }

  return (
    <>
      <Helmet>
        <title>Elevro | Sign Up</title>
      </Helmet>
      <div className="w-full">
        <div className="flex flex-col-reverse lg:flex-row-reverse">
          <div className="lg:w-1/2">
            <div className="flex justify-center items-center h-5/6">
              <img src="https://i.ibb.co/XfQ2LfT/side-picture.png" />
            </div>
          </div>
          <div className="lg:w-1/2 py-20 bg-primary">
            <div className="card max-w-lg mx-auto text-titleText">
              <h1 className="text-3xl font-bold text-center pt-14 text-menuText">
                Create New Account
              </h1>
              <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-menuText text-xl font-semibold">
                      Your Email
                    </span>
                  </label>
                  <input
                    type="Type your email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="Email"
                    className={`input rounded-md h-[55px] input-bordered focus:outline-none bg-[#E6E6E6] border-none ${
                      errors.email &&
                      "focus:border-red-700 focus:ring-red-700 border-red-700"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-red-700 font-bold">
                      {errors.email?.message}
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-menuText text-xl font-semibold">
                      Name
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    placeholder="Name"
                    className={`input rounded-md h-[55px] input-bordered focus:outline-none bg-[#E6E6E6] border-none ${
                      errors.name &&
                      "focus:border-red-700 focus:ring-red-700 border-red-700"
                    }`}
                  />
                  {errors.name && (
                    <span className="text-red-700 font-bold">
                      {errors.name?.message}
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-menuText text-xl font-semibold">
                      Image
                    </span>
                  </label>
                  <label
                    htmlFor="image"
                    className="input input-bordered rounded-md h-[55px] focus:outline-none bg-[#E6E6E6] border-none flex items-center"
                  >
                    <input
                      type="file"
                      {...register("image", { required: true })}
                      placeholder="Upload Image"
                      id="image"
                    />
                  </label>
                  {errors.image && (
                    <span className="text-red-700 font-bold">
                      Image  is required
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-menuText text-xl font-semibold">
                      Blood Group
                    </span>
                  </label>
                  <select
                    {...register("bloodGroup", {
                      required: "Bloog group is required",
                    })}
                    aria-invalid={errors["bloodGroup"] ? "true" : "false"}
                    placeholder="Select blood-group"
                    defaultValue="default"
                    className={`px-2 input rounded-md h-[55px] input-bordered focus:outline-none bg-[#E6E6E6] border-none ${
                      errors["bloodGroup"] &&
                      "focus:border-red-700 focus:ring-red-700 border-red-700"
                    }`}
                  >
                    <option disabled value="default">
                      Select blood-group
                    </option>
                    {bloodGroups.map((bloodGroup, idx) => (
                      <option key={idx} value={bloodGroup}>
                        {bloodGroup}
                      </option>
                    ))}
                  </select>
                  {errors["bloodGroup"] && (
                    <span className="text-red-700 font-bold">
                      {errors["bloodGroup"]?.message}
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-menuText text-xl font-semibold">
                      District
                    </span>
                  </label>
                  <select
                    {...register("district", {
                      required: "Selecting a district is required",
                    })}
                    aria-invalid={errors["district"] ? "true" : "false"}
                    defaultValue="default"
                    className={`input rounded-md h-[55px] input-bordered focus:outline-none bg-[#E6E6E6] border-none ${
                      errors["district"] &&
                      "focus:border-red-700 focus:ring-red-700 border-red-700"
                    }`}
                  >
                    <option disabled value="default">
                      Select District
                    </option>
                    {districts.map((district, idx) => (
                      <option key={idx} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                  {errors["district"] && (
                    <span className="text-red-700 font-bold">
                      {errors["district"]?.message}
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-menuText text-xl font-semibold">
                      Sub-District
                    </span>
                  </label>
                  <select
                    {...register("subDistrict", {
                      required: "Selecting a sub district is required",
                    })}
                    aria-invalid={errors["subDistrict"] ? "true" : "false"}
                    defaultValue="default"
                    className={`input rounded-md h-[55px] input-bordered focus:outline-none bg-[#E6E6E6] border-none ${
                      errors["subDistrict"] &&
                      "focus:border-red-700 focus:ring-red-700 border-red-700"
                    }`}
                  >
                    <option disabled value="default">
                      Select sub-district
                    </option>
                    {subDisctricts.map((subDistrict, idx) => (
                      <option key={idx} value={subDistrict.name}>
                        {subDistrict.name}
                      </option>
                    ))}
                  </select>
                  {errors["subDistrict"] && (
                    <span className="text-red-700 font-bold">
                      {errors["subDistrict"]?.message}
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-menuText text-xl font-semibold">
                      Password
                    </span>
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be 6 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Password must be less then 20 characters",
                      },
                      pattern: {
                        value: /(?=.*[A-Z])(?=.*[\W_])[a-zA-Z\d\W_]/,
                        message:
                          "Password must have one Uppercase and one Special letter",
                      },
                    })}
                    placeholder="Password"
                    className={`input rounded-md h-[55px] input-bordered focus:outline-none bg-[#E6E6E6] border-none ${
                      errors.password &&
                      "focus:border-red-700 focus:ring-red-700 border-red-700"
                    }`}
                  />
                  {errors.password && (
                    <span className="text-red-700 font-bold">
                      {errors.password?.message}
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-menuText text-xl font-semibold">
                      Confirm Password
                    </span>
                  </label>
                  <input
                    type="password"
                    {...register("confirmPassword", {
                      required: "Password is required",
                      validate: (value) =>
                        value === password || "The passwords do not match",
                    })}
                    placeholder="Confirm password"
                    className={`input rounded-md h-[55px] input-bordered focus:outline-none bg-[#E6E6E6] border-none ${
                      errors.confirmPassword &&
                      "focus:border-red-700 focus:ring-red-700 border-red-700"
                    }`}
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-700 font-bold">
                      {errors.confirmPassword?.message}
                    </span>
                  )}
                </div>
                <div className="form-control mt-6">
                  <input
                    type="submit"
                    value="Register"
                    className="btn border-none rounded-md bg-secondary hover:bg-secondaryHover text-white font-bold"
                  />
                </div>
              </form>
              <p className="pb-12 text-center text-menuText text-lg">
                <small>
                  Already have an account?{" "}
                  <Link to="/login" className="text-secondary font-bold">
                    Log in here
                  </Link>
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
