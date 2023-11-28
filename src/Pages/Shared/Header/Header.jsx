import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";

const Header = () => {
  const { user, logOutUser } = useContext(AuthContext);

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
    </>
  );
  return (
    <div className="shadow-md w-full">
      <div className="navbar max-w-[85rem] mx-auto">
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
          <a className="btn btn-ghost text-xl text-bodyText">Elevro</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-2 py-8 text-lg font-medium text-bodyText">
            {navItems}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <button
                className="btn btn-ghost text-lg font-medium"
                onClick={handleLogOut}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn-ghost text-lg font-medium text-bodyText">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="btn btn-ghost text-lg font-medium text-bodyText">
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
