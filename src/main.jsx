import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/RouterProvider.jsx'
import AuthProvider from './ContextApi/AuthProvider.jsx'
import toast, { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
    <Toaster></Toaster>
   </AuthProvider>
  </StrictMode>,
)
