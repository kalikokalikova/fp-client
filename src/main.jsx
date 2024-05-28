import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './pages/LandingPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Event from './components/events/Event.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <NotFoundPage/>,
    children: [
      { path: "/",
        element: <LandingPage/>
      },
      {
        path: "/events",
        element: <EventsPage/>
      },
      {
        path: "/events/:eventId",
        element: <Event/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
