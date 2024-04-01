import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useUser from "../../../Hooks/useUser";

const Header = () => {
  const { user, logOutUser } = useAuth();
  const [ userStatus ] = useUser();
  const navigate = useNavigate();
  
  const handleLogOut = () => {
    logOutUser()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/all-tests">All Tests</Link>
      </li>
      <li>
        <Link to="/featured-tests">Featured Tests</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
      <li>
        <Link to="/contact-us">Contact Us</Link>
      </li>
    </>
  );

  const handleBlocked = () => {
    Swal.fire({
      icon: "error",
      title: "Restricked / Blocked...",
      text: "You have been blocked from the server by an admin!",
      footer: "Please contact us thorugh contact us page"
    });
    navigate("/contact-us");
  }

  return (
    <div className="shadow-md w-full">
      <div className="navbar max-w-[90rem] mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <Link to="/">
            <img src="https://i.ibb.co/S09VYwN/elevro-logo.png" className="w-9/12 lg:w-7/12" alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-2 py-8 text-lg font-medium text-bodyText">
            {navItems}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <ul className="menu menu-horizontal px-2 py-8 text-lg font-medium text-bodyText">
              {!userStatus ? (
                <button onClick={handleBlocked} className="mr-5">Dashboard</button>
              ) : (
                <li>
                  <Link to='/dashboard'>Dashboard</Link>
                </li>
              )}

              </ul>
              <button
                className="btn border-none rounded-md bg-secondary hover:bg-secondaryHover text-white font-bold"
                onClick={handleLogOut}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn border-none rounded-none rounded-l-md bg-secondary hover:bg-secondaryHover text-white font-bold">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="btn border-none rounded-none rounded-r-md bg-primary hover:bg-primaryHover text-white font-bold">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
