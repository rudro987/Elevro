import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import AllTests from "../Pages/All Tests/AllTests";
import TestDetails from "../Pages/All Tests/TestDetails";
import DashBoardLayout from "../Layout/DashBoardLayout";
import DashBoardHome from "../Pages/DashboardPages/DashBoardHome/DashBoardHome";
import DashBoardAllTests from "../Pages/DashboardPages/DashBoardAllTests/DashBoardAllTests";
import DashBoardAllUsers from "../Pages/DashboardPages/DashBoardAllUsers/DashBoardAllUsers";
import AdminRoute from "./AdminRoute";
import DashBoardAddTest from "../Pages/DashboardPages/DashBoardAddTest/DashBoardAddTest";
import UserRoute from "./UserRoute";
import DashBoardReservations from "../Pages/DashboardPages/DashboardReservations/DashBoardReservations";
import DaashBoardAddBanner from "../Pages/DashboardPages/DashBoardAddBanner/DaashBoardAddBanner";
import DashBoardAllBanners from "../Pages/DashboardPages/DashBoardAllBanners/DashBoardAllBanners";
import UserProfile from "../Pages/UserDashBoard/UserProfile/UserProfile";
import UserAppointments from "../Pages/UserDashBoard/UserAppointments/UserAppointments";
import TestResults from "../Pages/UserDashBoard/TestResults/TestResults";
import FeaturedTests from "../Pages/FeaturedTests/FeaturedTests";
import Blog from "../Pages/Blog/Blog";
import ContactUS from "../Pages/ContactUs/ContactUS";
import SingleBlogPost from "../Pages/Blog/SingleBlogPost";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'register',
          element: <Register></Register>,
        },
        {
          path: 'all-tests',
          element: <AllTests></AllTests>
        },
        {
          path: 'all-tests/:id',
          element: <PrivateRoute><TestDetails></TestDetails></PrivateRoute>
        },
        {
          path: 'featured-tests',
          element: <FeaturedTests></FeaturedTests>
        },
        {
          path:'blog',
          element: <Blog></Blog>
        },
        {
          path: 'blog/:id',
          element: <SingleBlogPost></SingleBlogPost>
        },
        {
          path: 'contact-us',
          element: <ContactUS></ContactUS>
        }
        
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
    children: [
      //admin routes
      {
        path: 'home',
        element: <AdminRoute><DashBoardHome></DashBoardHome></AdminRoute>
      },
      {
        path: 'allTests',
        element: <AdminRoute><DashBoardAllTests></DashBoardAllTests></AdminRoute>
      },
      {
        path: 'addTest',
        element: <AdminRoute><DashBoardAddTest></DashBoardAddTest></AdminRoute>
      },
      {
        path: 'users',
        element: <AdminRoute><DashBoardAllUsers></DashBoardAllUsers></AdminRoute>
      },
      {
        path: 'allBookings',
        element: <DashBoardReservations></DashBoardReservations>
      },
      {
        path: 'addBanner',
        element: <DaashBoardAddBanner></DaashBoardAddBanner>
      },
      {
        path: 'banners',
        element: <DashBoardAllBanners></DashBoardAllBanners>
      },

      //normal user routes
      
      {
        path: 'profile',
        element: <UserRoute><UserProfile></UserProfile></UserRoute>
      },
      {
        path: 'appointments',
        element: <UserRoute><UserAppointments></UserAppointments></UserRoute>
      },
      {
        path: 'testResults',
        element: <UserRoute><TestResults></TestResults></UserRoute>
      },
    ]
  }
]);

export default router;