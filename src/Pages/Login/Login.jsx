import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const { logInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    logInUser(email, password).then((result) => {
      const user = result.user;
      Swal.fire({
        title: `${user?.displayName} Logged in successfully!`,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
      navigate(from, { replace: true });
    });
  };

  return (
    <>
      <Helmet>
        <title>Elevro | Sign Up</title>
      </Helmet>
      <div className="w-full">
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="lg:w-1/2">
            <div className="flex justify-center items-center h-[750px]">
              <img
                src="https://i.ibb.co/XXhPw9V/side-picture.png"
              />
            </div>
          </div>
          <div className="lg:w-1/2 py-36 bg-primary">
            <div className="card max-w-lg mx-auto text-titleText">
              <h1 className="text-3xl font-bold text-center pt-14 text-menuText">
                Login now!
              </h1>
              <form onSubmit={handleLogin} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-menuText">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered rounded-md h-[55px] focus:outline-none bg-[#E6E6E6] border-none"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-menuText">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input input-bordered rounded-md h-[55px] focus:outline-none bg-[#E6E6E6] border-none"
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn border-none rounded-md h-[55px] bg-secondary hover:bg-secondaryHover text-white font-bold">
                    Login
                  </button>
                </div>
              </form>
              <p className="pb-12 text-center text-menuText text-lg">
                <small>
                  New here?{" "}
                  <Link to="/register" className="text-secondary font-bold">
                    Create an account
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

export default Login;
