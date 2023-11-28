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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
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
        }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
    children: [
      //normal user routes
      

      //admin routes
      {
        path: 'home',
        element: <h1>Dashboard</h1>
      },
      {
        path: 'allTests',
        element: <h1>All tests</h1>
      },
      {
        path: 'addTest',
        element: <h1>Add a Test</h1>
      },
      {
        path: 'users',
        element: <h1>All Users</h1>
      },
      {
        path: 'allBookings',
        element: <h1>All Bookings</h1>
      },
      {
        path: 'addBanner',
        element: <h1>Add a Banner</h1>
      },
      {
        path: 'banners',
        element: <h1>All Banners</h1>
      },
      {
        path: 'profile',
        element: <h1>User Profile</h1>
      },
      {
        path: 'appointments',
        element: <h1>User Appointments</h1>
      },
      {
        path: 'testResults',
        element: <h1>Test Results</h1>
      },
    ]
  }
]);

export default router;