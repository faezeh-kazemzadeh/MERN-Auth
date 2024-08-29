import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer, Sidebar } from "./index";
import { Container } from "react-bootstrap";
const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
