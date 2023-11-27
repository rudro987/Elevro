import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createNewUser, updateUser } = useAuth();

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

  const onSubmit = (data) => {
    console.log(data);

    createNewUser(data.email, data.password).then((result) => {
      console.log(result.user);

      updateUser(data.name, data.photoURL)
        .then(() => {
          const userInfo = { name: data.name, email: data.email };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
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
    });
  };

  return (
    <>
      <Helmet>
        <title>Elevro | Sign Up</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="Type your email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="email"
                  className={`input input-bordered focus:outline-none ${
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
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  placeholder="name"
                  className={`input input-bordered focus:outline-none ${
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
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  placeholder="Photo URL"
                  className="input input-bordered focus:outline-none"
                />
                {errors.photoURL && (
                  <span className="text-red-700 font-bold">
                    Photo URL is required
                  </span>
                )}
              </div>
              <div className="form-control space-y-2">
                <label className="label">
                  <span className="label-text">Blood Group</span>
                </label>
                <select
                  {...register("bloodGroup", {
                    required: "Bloog group is required",
                  })}
                  aria-invalid={errors["bloodGroup"] ? "true" : "false"}
                  placeholder="Select blood-group"
                  defaultValue="default"
                  className={`input input-bordered focus:outline-none ${
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
              <div className="form-control space-y-2">
                <label className="label">
                  <span className="label-text">District</span>
                </label>
                <select
                  {...register("district", {
                    required: "Selecting a district is required",
                  })}
                  aria-invalid={errors["district"] ? "true" : "false"}
                  defaultValue="default"
                  className={`input input-bordered focus:outline-none ${
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
              <div className="form-control space-y-2">
                <label className="label">
                  <span className="label-text">Sub-District</span>
                </label>
                <select
                  {...register("subDistrict", {
                    required: "Selecting a sub district is required",
                  })}
                  aria-invalid={errors["subDistrict"] ? "true" : "false"}
                  defaultValue="default"
                  className={`input input-bordered focus:outline-none ${
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
                  <span className="label-text">Password</span>
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
                  placeholder="password"
                  className={`input input-bordered focus:outline-none ${
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
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Password is required",
                    validate: (value) =>
                      value === password || "The passwords do not match",
                  })}
                  placeholder="Confirm password"
                  className={`input input-bordered focus:outline-none ${
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
                  className="btn btn-primary"
                />
              </div>
            </form>
            <p>
              <small>
                Already have an account? <Link to="/login">Log in here</Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
