import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import HomePage from './routes/HomePage/HomePage.jsx'
import DashboardPage from './routes/dashboardPage/dashboardPage.jsx'
import ChatPage from './routes/chatPage/chatPage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/rootLayout/rootLayout.jsx'
import DashboardLayout from './layouts/dashboardLayout/dashboardLayout.jsx'
import { SignIn, SignUp } from '@clerk/clerk-react'


const router=createBrowserRouter([
 {
  element:<RootLayout/>,
  children:[
    {
      path:"/",element:<HomePage/>,
    },
    {
      path:"/sign-in/*",
      element:<SignIn/>
    },
    {
      path:"/sign-up/*",
      element:<SignUp/>
    },
    {
      element:<DashboardLayout/>,
      children:[
        {path:"/dashboard",element:<DashboardPage/>},
        {path:"/dashboard/chats/:id",element:<ChatPage/>},
      ],
    },
  ]
 }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
