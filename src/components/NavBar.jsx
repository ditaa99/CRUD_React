// import components from react-bootstrap library
import { Navbar, Container, Nav, Button } from "react-bootstrap";
// import components from react-router-dom library
import { Link, NavLink, useLocation } from "react-router-dom";

// define a custom navbar component
const CustomNavbar = () => {
  // get the current location object from the router
  const location = useLocation();

  // return the JSX element for the navbar
  return (
    // use the Navbar component with some props
    <Navbar bg="light" variant="light" expand="lg" className="navbar">
      <Container className="navbar-container">
        <div className="navbar-brand-container">
          <Navbar.Brand as={Link} to="/" className="navbar-brand">
             {/* use a span element with some animated text for the brand name */}
            <span className="animated-text">𝕯𝖎𝖙𝖆 🍂</span>
          </Navbar.Brand>
        </div>
        {/* // use the Navbar.Toggle component to show a toggle button for small screens */}
        <Navbar.Toggle aria-controls="navbar" />
        {/* // use the Navbar.Collapse component to collapse the navbar content on small screens */}
        <Navbar.Collapse id="navbar">
          <Nav className="m-auto navbar-nav">
            <Nav.Link
              as={NavLink}
              exact
              to="/staffmembers"
              isActive={() =>
                ["/staffmembers", "/staffmembers/:id"].includes(
                  location.pathname
                )
              }
              className="d-flex nav-link"
            >
              Staff Members
            </Nav.Link>
          </Nav>
          <Button as={Link} to="/addstaffmember" variant="primary" className="add-button">
            Add Staff Member
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// export the custom navbar component as default
export default CustomNavbar;
