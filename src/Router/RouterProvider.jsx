import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Components/Home";
import AllLoans from "../Components/AllLoans";
import AboutUs from "../Components/AboutUs";
import Contact from "../Components/Contact";
import LoanDetails from "../Components/LoanDetails";
import Login from "../Components/Login/Login";
import Register from "../Components/Login/Register/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import LoanApplicationForm from "../Pages/LoanApplication";


export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path:'all-loans',
        Component:AllLoans
      },
      {
        path:'about-us',
        Component:AboutUs
      },
      {
        path:'contact',
        Component:Contact
      }
      ,{
        path:'loan-details/:id',
        element:<PrivateRoute><LoanDetails></LoanDetails></PrivateRoute>
      },
      {
        path:'/login',
        Component:Login
      },
      {
        path:'/register',
        Component:Register
      },
      {
        path:'loan-application',
        Component:LoanApplicationForm
      }
    ]
  },
]);