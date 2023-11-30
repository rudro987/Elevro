import { FaUsers } from "react-icons/fa";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { ImBlocked } from "react-icons/im";
import { BsInfoCircleFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UsersTable = ({ users, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleStatus = (targetUser) => {
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
    if (targetUser.role === "user") {
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
          axiosSecure
            .patch(`/users/admin/${targetUser._id}?role=user`)
            .then((res) => {
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
      });
    } else if (targetUser.role === "admin") {
      Swal.fire({
        title: "Are you sure?",
        text: `${targetUser.name} will be removed from admin privileges`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Remove now!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .patch(`/users/admin/${targetUser._id}?role=admin`)
            .then((res) => {
              if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                  title: "Success!",
                  text: `${targetUser.name} is now an User`,
                  icon: "success",
                });
              }
            });
        }
      });
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="bg-white rounded-lg w-full h-full pb-12 pt-5">
        <table className="table table-zebra w-full">
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
                    <img src={user.image} alt="" />
                  </div>
                </th>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => makeAdmin(user)}
                      className="btn btn-lg bg-primary hover:bg-primaryHover"
                    >
                      <RiAdminFill className="text-white text-2xl" />
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
                      onClick={() => handleStatus(user)}
                      className="btn btn-lg status-btn"
                    >
                      <HiOutlineStatusOnline className="text-white" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatus(user)}
                      className="btn btn-lg status-btn"
                    >
                      <ImBlocked className="text-white" />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() =>
                      document
                        .getElementById(`user_info${user._id}`)
                        .showModal()
                    }
                    className="btn btn-ghost btn-lg info-btn"
                  >
                      <dialog
                        id={`user_info${user._id}`}
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <div className="modal-box">
                          <h3 className="font-bold text-2xl">
                            {user.name}&apos;s Info
                          </h3>
                            <div className="flex justify-center pt-10">
                            <img src={user.image} alt={user.name} className="rounded-xl w-[400px] h-[400px]" />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 py-10 gap-5">
                            <p className="font-normal text-lg">
                            Email: {user.email}
                          </p>
                          <p className="font-normal text-lg">
                            Blood group: {user.bloodGroup}
                          </p>
                          <p className="font-normal text-lg">
                            District: {user.district}
                          </p>
                          <p className="font-normal text-lg">
                            Sub-District: {user.subDistrict}
                          </p>
                          <p className="font-normal text-lg">
                            User Status: {user.status}
                          </p>
                          <p className="font-normal text-lg">
                            User role: {user.role}
                          </p>
                            </div>
                          <div className="modal-action">
                            <form method="dialog">
                              <input type="submit" value="Close" className="btn" />
                            </form>
                          </div>
                        </div>
                      </dialog>
                    <BsInfoCircleFill className="text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
