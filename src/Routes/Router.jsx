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
          element: <TestDetails></TestDetails>
        }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><h1>Dashboard</h1></PrivateRoute>,
    children: [
      //normal user routes
      

      //admin routes
      {
        path: 'users',
        element: <h1>All Users</h1>
      },
    ]
  }
]);

export default router;