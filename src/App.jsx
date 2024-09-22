import React from "react";
import { Outlet, Link } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import NavBar from "./components/NavBar";
import "./App.css";
import "normalize.css";

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <NavBar />
        <Outlet />
      </LocalizationProvider>
    </>
  );
}

export default App;
