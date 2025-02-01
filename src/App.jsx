import React from "react";
import { Outlet, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import NavBar from "./components/NavBar";
import "./App.css";
import "normalize.css";

const queryClient = new QueryClient();

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <NavBar />
        <Outlet />
      </LocalizationProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
