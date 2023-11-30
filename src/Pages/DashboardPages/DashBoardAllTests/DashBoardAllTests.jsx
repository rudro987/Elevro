import Loader from "../../../Components/Loader";
import useAllTests from "../../../Hooks/useAllTests";
import { GrDocumentUpdate } from "react-icons/gr";
import { FaTrash } from "react-icons/fa";
import UpdateTest from "./UpdateTest";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const DashBoardAllTests = () => {
  const [allTests, loading, refetch] = useAllTests();
  const axiosSecure = useAxiosSecure();
  if (loading) {
    return <Loader></Loader>;
  }
  const handleDelete = id => {
    Swal.fire({
        title: "Are you sure you want to delete this?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/allTests/${id}`);
            if(res.data.deletedCount > 0){
                refetch();
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
            }
        }
      });
  }

  return (
    <div className="bg-white rounded-lg w-full h-full pb-12 pt-5">
      <table className="table table-zebra w-full">
        <thead>
          <tr className="text-center text-blackTest text-sm">
            <th></th>
            <th>Image</th>
            <th>Test Name</th>
            <th>Price</th>
            <th>Slots</th>
            <th>Bookings</th>
            <th>Last Date</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allTests.map((test, idx) => (
            <tr key={test._id} className="text-center text-lg">
              <td>{idx + 1}</td>
              <td>
                <div className="flex items-center w-12 h-12 mx-auto">
                  <img src={test.image_url} alt="" />
                </div>
              </td>
              <td>{test.test_name}</td>
              <td>{test.price}</td>
              <td>{test.slots}</td>
              <td>{test.bookings}</td>
              <td>{test.date}</td>
              <td>
                <button
                  onClick={() =>
                    document.getElementById(`test-update${test._id}`).showModal()
                  }
                  className="btn btn-lg bg-primary hover:bg-primaryHover"
                >
                <dialog id={`test-update${test._id}`} className="modal modal-bottom sm:modal-middle">
                    <UpdateTest test={test} refetch={refetch}></UpdateTest>
                </dialog>
                  <GrDocumentUpdate className="text-white text-2xl" />
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(test._id)} className="btn btn-lg bg-secondary hover:bg-secondaryHover">
                  <FaTrash className="text-white text-2xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashBoardAllTests;
