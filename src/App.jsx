import React from "react";
import { Outlet, Link } from 'react-router-dom';

import NavBar from "./components/NavBar";

function App() {


  return (
    <>
      <NavBar/>
      <Outlet />
    </>
  )
}

export default App
