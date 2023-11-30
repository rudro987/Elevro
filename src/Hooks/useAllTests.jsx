import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllTests = () => {

    const axiosPublic = useAxiosPublic();
    
    const { data: allTests = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['allTests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allTests');
            return res.data;
        }
    });
    return [allTests, loading, refetch];
};

export default useAllTests;