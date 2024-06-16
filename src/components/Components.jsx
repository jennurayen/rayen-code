import React from "react";
import Aside from "./Aside";
import { Outlet } from "react-router-dom";

function Components() {
  return (
    <div className="components-page">
      <Aside />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Components;
