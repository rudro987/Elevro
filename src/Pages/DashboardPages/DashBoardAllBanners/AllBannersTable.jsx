import { RiDeleteBin6Fill } from "react-icons/ri";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { VscVmActive } from "react-icons/vsc";
import { TbDeviceDesktopCancel } from "react-icons/tb";
import { useState } from "react";

const AllBannersTable = ({ banners, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [activeBannerId, setActiveBannerId] = useState(null);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this banner?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/banners/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Banner deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleActivation = (id) => {
    Swal.fire({
      title: "Activate this banner?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, activate it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (id !== activeBannerId) {
          if (activeBannerId) {
            await axiosSecure.patch(`/banners/${activeBannerId}`, {
              active: false,
            });
          }
          const res = await axiosSecure.patch(`/banners/${id}`, {
            active: true,
          });
          if (res.data.modifiedCount > 0) {
            setActiveBannerId(id);
            refetch();
            Swal.fire({
              title: "Activated!",
              text: "Banner activated.",
              icon: "success",
            });
          }
        }
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="bg-white rounded-lg w-full h-full pb-12 pt-5">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="text-center text-blackTest text-sm">
                <th></th>
                <th>Banner Image</th>
                <th>Banner Title</th>
                <th>Description</th>
                <th>Discount Amount</th>
                <th>Coupon Code</th>
                <th>Active Status</th>
                <th>Delete Banner</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner, idx) => (
                <tr key={banner._id} className="text-center text-md">
                  <td>{idx + 1}</td>
                  <td>
                    <div className="w-12 h-12 mx-auto flex items-center">
                      <img src={banner.image} alt={banner.title} />
                    </div>
                  </td>
                  <td>{banner.title}</td>
                  <td>{banner.description}</td>
                  <td>{banner.discount}%</td>
                  <td>{banner.coupon}</td>
                  <td>
                    {banner.active === false ? (
                      <button
                        onClick={() => handleActivation(banner._id)}
                        className="btn btn-lg bg-primary hover:bg-primaryHover"
                      >
                        <TbDeviceDesktopCancel className="text-white text-2xl" />
                      </button>
                    ) : (
                      <button className="btn btn-lg bg-primary hover:bg-primaryHover">
                        <VscVmActive className="text-white text-2xl" />
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(banner)}
                      className="btn btn-lg status-btn"
                    >
                      <RiDeleteBin6Fill className="text-white" />
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

export default AllBannersTable;
