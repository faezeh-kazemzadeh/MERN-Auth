import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages";
import Layout from "../components/Layout/Layout";
import { NotFound, PrivateRoute, UnAuthorized } from "../components/shared";
import { SignIn, SignUp ,UserProfile } from "../pages";
import { useSelector } from "react-redux";

const AppRoutes = () => {
  const ROLES = {
    Admin: "admin",
    Moderator: "moderator",
    User: "user",
    Guest: "guest",
  };
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/signin"
            element={
              currentUser ? <Navigate to="/" replace={true} /> : <SignIn />
            }
          />
          <Route
            path="/signup"
            element={
              currentUser ? <Navigate to="/" replace={true} /> : <SignUp />
            }
          />
          <Route path="/unauthorized" element={<UnAuthorized />} />
          <Route
            element={<PrivateRoute allowedRoles={[ROLES.Admin]} />}
          > 
            <Route path="/admin" element={<div>Admin</div>} />
          </Route>
          <Route
            element={<PrivateRoute allowedRoles={[...Object.values(ROLES)]} />}
          > 
            <Route path="/profile" element={<UserProfile/>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
