import Loader from "../../../Components/Loader";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const DashBoardBlogs = () => {
    const axiosSecure = useAxiosSecure();
    const { data: blogs = [], refetch, isPending: loading} = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/blogs');
            return res.data;
        }
    });

    if (loading) {
      return <Loader></Loader>;
    }
    const handleDelete = id => {
      Swal.fire({
          title: "Delete this Blog?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
          if (result.isConfirmed) {
              const res = await axiosSecure.delete(`/blogs/${id}`);
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
        <div>
            <h1 className="text-2xl font-semibold pb-10">All Blog Posts</h1>
            <div className="bg-white rounded-lg w-full h-full pt-5">
      <table className="table table-zebra w-full">
        <thead>
          <tr className="text-center text-blackTest text-sm">
            <th></th>
            <th>Image</th>
            <th>Title</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((post, idx) => (
            <tr key={post._id} className="text-center text-lg">
              <td>{idx + 1}</td>
              <td>
                <div className="flex items-center w-12 h-12 mx-auto">
                  <img src={post.image} alt="" />
                </div>
              </td>
              <td>{post.title}</td>
              <td>
                <button onClick={() => handleDelete(post._id)} className="btn btn-lg bg-primary hover:bg-primaryHover">
                  <FaTrash className="text-menuText text-2xl" />
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

export default DashBoardBlogs;