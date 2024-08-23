import React from "react";
import { Outlet } from "react-router-dom";
const RootRoute = ({ children }) => {
  return (
    <>
      <Outlet />
    </>
  );
};
export default RootRoute;
