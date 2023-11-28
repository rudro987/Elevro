import { FaBookmark, FaHospitalUser, FaList, FaUsers } from "react-icons/fa";
import { MdAddBox, MdDashboard, MdOutlineAddToQueue } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { TbBrandBooking } from "react-icons/tb";
import { GiTatteredBanner } from "react-icons/gi";
import { RiProfileFill } from "react-icons/ri";


const DashBoardLayout = () => {
  const isAdmin = true;

  return (
    <div className="flex max-w-[90rem] mx-auto">
      <div className="w-64 min-h-screen bg-orange-500">
        <ul className="menu p-4 uppercase">
          {
            isAdmin ? <>
            <li>
            <NavLink to="/dashboard/home">
            <MdDashboard />
              DashBoard
            </NavLink>
          </li>
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
            </>
            :
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
              Upcoming Appointments
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/testResults">
              <FaList />
              Test Results
            </NavLink>
          </li>
            </>
          }
        </ul>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoardLayout;
