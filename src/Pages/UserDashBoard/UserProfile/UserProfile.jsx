import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Loader from "../../../Components/Loader";
import { FaEdit } from "react-icons/fa";
import UpdateProfile from "./UpdateProfile";


const UserProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: loggedInUser = {}, isPending: loading, refetch } = useQuery({
    queryKey: ["loggedInUser", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loggedUser/${user.email}`);
      return res.data;
    },
  });
  const {
    _id,
    image,
    name,
    email,
    district,
    subDistrict,
    bloodGroup,
    role,
    status,
  } = loggedInUser;


  if(loading) {
    return <Loader></Loader>
  }
  return (
    <div>
      <h1 className="text-2xl font-semibold pb-10">My Profile</h1>
      <div>
        <div className="hero bg-white py-5 rounded-lg">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img src={image} className="max-w-md rounded-lg shadow-2xl" />
            <div>
              <h1 className="text-2xl font-semibold mb-3">User name: {name}</h1>
              <div className="grid grid-cols-2 gap-2 lg:w-[630px]">
                <div className="pt-5 flex gap-1 items-center">
                  <p className="text-lg text-bodyText">
                    Email: {email}
                  </p>
                </div>
                <div className="pt-5 flex gap-2 items-center">
                  <p className="text-lg text-bodyText">
                    {" "}
                    District: {district}
                  </p>
                </div>
                <div className="pt-5 flex gap-2 items-center">
                  <p className="text-lg text-bodyText"> Sub District: {subDistrict}</p>
                </div>
                <div className="pt-5 flex gap-2 items-center">
                  <p className="text-lg text-bodyText"> User Role: {role}</p>
                </div>
                <div className="pt-5 flex gap-2 items-center">
                  <p className="text-lg text-bodyText"> Status: {status}</p>
                </div>
                <div className="pt-5 flex gap-2 items-center">
                  <p className="text-lg text-bodyText"> Blood Group: {bloodGroup}</p>
                </div>
              </div>
              <button onClick={() =>
                    document.getElementById(`profile-update${_id}`).showModal()
                  } className="btn bg-primary hover:bg-primaryHover text-2xl text-white mt-10">
                  <dialog id={`profile-update${_id}`} className="modal modal-bottom sm:modal-middle">
                    <UpdateProfile loggedInUser={loggedInUser} refetch={refetch}></UpdateProfile>
                </dialog>
                  <FaEdit /> Edit Porfile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
