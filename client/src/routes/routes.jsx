import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages";
import Layout from "../components/Layout/Layout";
import { NotFound} from "../components/shared";
import { SignIn, SignUp } from "../pages";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
