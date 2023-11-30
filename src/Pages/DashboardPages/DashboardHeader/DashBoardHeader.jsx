import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const DashBoardHeader = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: `${user.displayName} you are successfully logged out!`,
            showConfirmButton: false,
            timer: 1500
          });
          navigate("/");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="max-w-[90rem] mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Elevro</h1>
        <div>
        <Link to="/">
                <button className="btn btn-ghost text-lg font-medium text-menuText">
                  Home
                </button>
              </Link>
                <button onClick={handleLogOut} className="btn border-none rounded-md bg-secondary hover:bg-secondaryHover text-white font-bold">
                  Logout
                </button>
        </div>
      </div>
    </div>
  );
};

export default DashBoardHeader;
