import {
  Navbar,
  Nav,
  Container,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavLink,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaSignInAlt, FaSignOutAlt ,FaUser } from "react-icons/fa";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../Redux/slices/auth";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const signOutHandler = (e) => {
    e.preventDefault();
    if (!currentUser) {
      console.log("noone is Logged In");
      return;
    }
    axios
      .post("/api/users/signout")
      .then((res) => {
        dispatch(signout());
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <NavbarBrand href="/">Mern App</NavbarBrand>
          <NavbarToggle aria-controls="basic-navbar-nav" />
          <NavbarCollapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {currentUser ? (
                <>
                  <LinkContainer to="/profile">
                    <NavLink onClick={() => navigate("/profile")}>
                      <FaUser /> Profile
                    </NavLink>
                  </LinkContainer>
                  <LinkContainer to="/signout">
                    <NavLink onClick={signOutHandler}>
                      <FaSignOutAlt /> Sign Out
                    </NavLink>
                  </LinkContainer>
                </>
              ) : (
                <LinkContainer to="/signin">
                  <NavLink>
                    <FaSignInAlt /> Sign In
                  </NavLink>
                </LinkContainer>
              )}
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
