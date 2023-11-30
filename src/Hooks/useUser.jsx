import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: userStatus, isPending: userLoading } = useQuery({
        queryKey: [user?.email, 'userStatus'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data?.userStatus;
        }
    });
    return [userStatus, userLoading];
};

export default useUser;