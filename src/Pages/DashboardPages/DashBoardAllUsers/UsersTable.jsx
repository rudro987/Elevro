import { FaUsers } from "react-icons/fa";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { ImBlocked } from "react-icons/im";
import { BsInfoCircleFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UsersTable = ({ users, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleUserStatus = (targetUser) => {
    if (targetUser.status === "active") {
      Swal.fire({
        title: "Are you sure?",
        text: `${targetUser.name} will be blocked from all privileges`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Block Now!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .patch(`/users/${targetUser._id}?status=active`)
            .then((res) => {
              if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                  title: "Blocked!",
                  text: `${targetUser.name} is blocked from any privilege`,
                  icon: "success",
                });
              }
            });
        }
      });
    } else if (targetUser.status === "blocked") {
      Swal.fire({
        title: "Are you sure?",
        text: `${targetUser.name} will be given User privileges`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Unblock Now!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .patch(`/users/${targetUser._id}?status=blocked`)
            .then((res) => {
              if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                  title: "Unblocked!",
                  text: `${targetUser.name} has user privilege now`,
                  icon: "success",
                });
              }
            });
        }
      });
    }
  };

  const makeAdmin = (targetUser) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${targetUser.name} will have admin privileges`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (targetUser.role === "user") {
          axiosSecure.patch(`/users/admin/${targetUser._id}`).then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: "Success!",
                text: `${targetUser.name} is now an Admin`,
                icon: "success",
              });
            }
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr className="text-center text-blackTest text-sm">
              <th>Avatar</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>User Info</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center text-lg">
                <th>
                  <div className="mask mask-squircle w-12 h-12 mx-auto">
                    <img src={user.image} alt="Avatar Tailwind CSS Component" />
                  </div>
                </th>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <button className="btn btn-lg bg-primary hover:bg-primaryHover">
                      <RiAdminFill Users className="text-white text-2xl" />
                    </button>
                  ) : (
                    <button
                      onClick={() => makeAdmin(user)}
                      className="btn btn-lg bg-primary hover:bg-primaryHover"
                    >
                      <FaUsers className="text-white text-2xl" />
                    </button>
                  )}
                </td>
                <td>
                  {user.status === "active" ? (
                    <button
                      onClick={() => handleUserStatus(user)}
                      className="btn btn-lg status-btn"
                    >
                      <HiOutlineStatusOnline className="text-white" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUserStatus(user)}
                      className="btn btn-lg status-btn"
                    >
                      <ImBlocked className="text-white" />
                    </button>
                  )}
                </td>
                <td>
                  <button className="btn btn-ghost btn-lg info-btn">
                    <BsInfoCircleFill className="text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
