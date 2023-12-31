import {
  FaBlog,
  FaBloggerB,
  FaBookmark,
  FaHospitalUser,
  FaList,
  FaUsers,
} from "react-icons/fa";
import { MdAddBox, MdOutlineAddToQueue } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { TbBrandBooking } from "react-icons/tb";
import { GiTatteredBanner } from "react-icons/gi";
import { RiProfileFill } from "react-icons/ri";
import DashBoardHeader from "../Pages/DashboardPages/DashboardHeader/DashBoardHeader";
import useAdmin from "../Hooks/useAdmin";
import Loader from "../Components/Loader";
import { Helmet } from "react-helmet-async";

const DashBoardLayout = () => {
  const [isAdmin, isAdminLoading] = useAdmin();

  if (isAdminLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="bg-[#F1F5F9]">
      <Helmet>
        <title>Elevro | Dashboard</title>
      </Helmet>
      <div className="py-12 bg-primary">
        <DashBoardHeader></DashBoardHeader>
      </div>
      <div className="flex max-w-[90rem] mx-auto gap-14">
        <div className="w-80 min-h-screen bg-white">
          <ul className="menu p-5 text-xl gap-5">
            {isAdmin ? (
              <>

                <li>
                  <NavLink to="/dashboard/allTests">
                    <FaHospitalUser />
                    All Tests
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addTest">
                    <MdAddBox />
                    Add a Test
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/users">
                    <FaUsers />
                    All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allBookings">
                    <TbBrandBooking />
                    Reservations
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addBanner">
                    <MdOutlineAddToQueue />
                    Add a Banner
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/banners">
                    <GiTatteredBanner />
                    All Banners
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/blogs">
                    <FaBlog />
                    Blog Posts
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addBlog">
                    <FaBloggerB />
                    Add Blog Post
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/profile">
                    <RiProfileFill />
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/appointments">
                    <FaBookmark />
                    Reservations
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/testResults">
                    <FaList />
                    Test Results
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="flex w-full flex-col min-h-screen pt-5">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
