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
  import { FaSignInAlt, FaSignOutAlt  } from "react-icons/fa";
  const Header = () => {
    return (
      <header>
        <Navbar bg="dark" variant="dark" expand='lg' collapseOnSelect>
          <Container>
            <NavbarBrand href="/">Mern App</NavbarBrand>
            <NavbarToggle aria-controls="basic-navbar-nav" />
            <NavbarCollapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <LinkContainer to="/signin">   
                <NavLink >
                  <FaSignInAlt /> Sign In
                </NavLink>
                </LinkContainer>
                <LinkContainer to="/signout">
                <NavLink >
                  <FaSignOutAlt /> Sign Out
                </NavLink>
                </LinkContainer>
              </Nav>
            </NavbarCollapse>
          </Container>
        </Navbar>
      </header>
    );
  };
  
  export default Header;