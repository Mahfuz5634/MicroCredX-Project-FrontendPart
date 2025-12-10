import { createBrowserRouter } from "react-router";
import Hello from "../Hello";



export const router = createBrowserRouter([
  {
    path: "/",
    Component:Hello
  },
]);