import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useUser from "../Hooks/useUser";
import Loader from "../Components/Loader";
import Swal from "sweetalert2";

const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [userStatus, userLoading] = useUser();
  const location = useLocation();

  if (loading || userLoading) return <Loader></Loader>;

  if (user && userStatus) {
    return children;
  }
  return (
    Swal.fire({
      icon: "error",
      title: "Restricked / Blocked...",
      text: "You have been blocked from the server by an admin!",
      footer: "Please contact us thorugh contact us page",
    }),
    (<Navigate to="/contact-us" state={{ from: location }} replace></Navigate>)
  );
};

export default UserRoute;
