import {
  createBrowserRouter,
} from "react-router-dom";
import DashBoardLayout from "../Layout/DashBoardLayout";
import MainLayout from "../Layout/MainLayout";
import AllTests from "../Pages/All Tests/AllTests";
import TestDetails from "../Pages/All Tests/TestDetails";
import Blog from "../Pages/Blog/Blog";
import ContactUS from "../Pages/ContactUs/ContactUS";
import DaashBoardAddBanner from "../Pages/DashboardPages/DashBoardAddBanner/DaashBoardAddBanner";
import DashBoardAddBlog from "../Pages/DashboardPages/DashBoardAddBlog/DashBoardAddBlog";
import DashBoardAddTest from "../Pages/DashboardPages/DashBoardAddTest/DashBoardAddTest";
import DashBoardAllBanners from "../Pages/DashboardPages/DashBoardAllBanners/DashBoardAllBanners";
import DashBoardAllTests from "../Pages/DashboardPages/DashBoardAllTests/DashBoardAllTests";
import DashBoardAllUsers from "../Pages/DashboardPages/DashBoardAllUsers/DashBoardAllUsers";
import DashBoardBlogs from "../Pages/DashboardPages/DashBoardBlogs/DashBoardBlogs";
import DashBoardReservations from "../Pages/DashboardPages/DashboardReservations/DashBoardReservations";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import FeaturedTests from "../Pages/FeaturedTests/FeaturedTests";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import TestResults from "../Pages/UserDashBoard/TestResults/TestResults";
import UserAppointments from "../Pages/UserDashBoard/UserAppointments/UserAppointments";
import UserProfile from "../Pages/UserDashBoard/UserProfile/UserProfile";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import UserRoute from "./UserRoute";
import FullBlogPost from "../Pages/Blog/FullBlogPost";

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
          element: <FullBlogPost></FullBlogPost>
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
        path: 'dashboard',
        element: <h1 className="text-2xl font-bold">Dashboad</h1>
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
        element: <AdminRoute><DashBoardReservations></DashBoardReservations></AdminRoute>
      },
      {
        path: 'addBanner',
        element: <AdminRoute><DaashBoardAddBanner></DaashBoardAddBanner></AdminRoute>
      },
      {
        path: 'banners',
        element: <AdminRoute><DashBoardAllBanners></DashBoardAllBanners></AdminRoute>
      },
      {
        path: 'blogs',
        element: <AdminRoute><DashBoardBlogs></DashBoardBlogs></AdminRoute>
      },
      {
        path: 'addBlog',
        element: <AdminRoute><DashBoardAddBlog></DashBoardAddBlog></AdminRoute>
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