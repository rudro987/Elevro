import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Components/Loader";
import AllBannersTable from "./AllBannersTable";

const DashBoardAllBanners = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: banners = [],
    refetch,
    isPending: loading,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/banners");
      return res.data;
    },
  });
  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Total Banners: {banners.length}</h1>
      <div className="py-10">
        <AllBannersTable banners={banners} refetch={refetch}></AllBannersTable>
      </div>
    </div>
  );
};

export default DashBoardAllBanners;
