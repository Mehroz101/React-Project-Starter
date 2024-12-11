import React from "react";
import { Navbar } from "../utils/LazyLoadComponent";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="main_container">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
