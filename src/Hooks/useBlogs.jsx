import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllTests = () => {
    const axiosPublic = useAxiosPublic();
    const { data: allBlogs = [], isPending: loading } = useQuery({
        queryKey: ['allBlogs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allBlogs');
            return res.data;
        }
    });
    return [allBlogs, loading];
};

export default useAllTests;