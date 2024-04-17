import React, { useState } from "react";
import DittoNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./Profile";
import {Link} from "react-router-dom";

function Ditto() {
  
  return (
    // <Provider store={store}>
    <div className="d-flex">
      {/* <DittoNavigation /> */}
      <div style={{ flexGrow: 1 }}>
      <Routes>
      <Route path="/" element={<Navigate to="Home" />} />
        </Routes>
      </div>
    </div>
    // </Provider>
  );
}
export default Ditto;
