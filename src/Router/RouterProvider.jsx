import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Components/Home";
import AllLoans from "../Components/AllLoans";
import AboutUs from "../Components/AboutUs";
import Contact from "../Components/Contact";
import LoanDetails from "../Components/LoanDetails";


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
        Component:LoanDetails
      }
    ]
  },
]);