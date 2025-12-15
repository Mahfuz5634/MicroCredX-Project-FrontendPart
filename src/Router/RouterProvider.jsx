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
import DashboardLayout from "../Layouts/DashboardLayout";
import Overview from "../Pages/Overview";
import ManageLoans from "../Pages/ManageLoans";
import AddLoan from "../Pages/AddLoan";
import PendingLoans from "../Pages/PendingLoans";
import ApprovedLoans from "../Pages/ApprovedLoans";
import AllLoanAdmin from "../Pages/AllLoanAdmin";
import MyLoans from "../Pages/MyLoans";
import Profile from "../Pages/Profile";
import Users from "../Pages/AdminAlluser";
import AdminLoanApplications from "../Pages/AdminLoanApplication";
import PaymentSuccess from "../Pages/PaymentSucces";
import PaymentCancel from "../Pages/PaymentCancel";
import NotFound from "../Pages/NotFound";


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
  {
  path: "/dashboard",
  element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
  children: [
    { index: true, element: <Overview /> },
    { path: "add-loan", element: <AddLoan /> },
    { path: "manage-loans", element: <ManageLoans /> },
    { path: "pending-loans", element: <PendingLoans /> },
    { path: "approved-loans", element: <ApprovedLoans/> },
    { path: "all-loan", element: <AllLoanAdmin /> },
    { path: "my-loans", element: <MyLoans /> },
    { path: "profile", element: <Profile /> },
    {path:'all-users',element :<Users></Users>  },
    {path:"pending-adminloans",element:<AdminLoanApplications></AdminLoanApplications>},
   
    
  ],
},
 {
      path:'payment-success',
      element:<PaymentSuccess></PaymentSuccess>
    },
    {
      path:"payment-cancel",
      element:<PaymentCancel></PaymentCancel>
    },
    {
      path:'*',
      Component:NotFound,
    }
]);