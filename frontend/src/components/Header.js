import React from "react";

import { useContext } from "react";
import DataContext from "../context/DataContext";

import { Button, Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

const Header = () => {
  const { deleteToken, token } = useContext(DataContext);

  return (
    <Navbar bg="info" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Tursitička agencija</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/pocetna">Početna</Nav.Link>
            <Nav.Link href="/moja-putovanja">Moja putovanja</Nav.Link>
            <Nav.Link href="/planirana-putovanja">Planirana putovanja</Nav.Link>
            {token?.role == 987 && (
              <Nav.Link href="/dodaj-putovanje">Dodaj putovanje</Nav.Link>
            )}

            <NavDropdown title="Stil" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Stil 1</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Stil 2</NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
            </NavDropdown>
          </Nav>

          <Button variant="danger mx-2" onClick={deleteToken}>
            Odjavi se
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
