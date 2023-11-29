import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UsersTable from "./UsersTable";
import Loader from "../../../Components/Loader";


const DashBoardAllUsers = () => {
    const axiosSecure = useAxiosSecure();
  const { data: users = [] , refetch, isLoading: loading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  if(loading){
    return <Loader></Loader>
  }
    return (
        <div>
            <h1 className="text-2xl font-semibold">Total Users: {users.length}</h1>
            <div className="py-10">
                <UsersTable users={users} refetch={refetch}></UsersTable>
            </div>
        </div>
    );
};

export default DashBoardAllUsers;