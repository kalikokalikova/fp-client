import React from "react";
import { Outlet, Link } from 'react-router-dom';

import NavBar from "./components/NavBar";
import 'normalize.css';

function App() {


  return (
    <>
      <NavBar/>
      <Outlet />
    </>
  )
}

export default App
