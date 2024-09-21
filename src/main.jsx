import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.jsx';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './pages/LandingPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Event from './components/events/Event.jsx';
import CreateEventPage from './pages/CreateEventPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <NotFoundPage/>,
    children: [
      { path: "/",
        element: <CreateEventPage/>
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
    <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
