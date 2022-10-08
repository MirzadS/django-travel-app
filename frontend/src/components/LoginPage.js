import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useContext } from "react";
import DataContext from "../context/DataContext";

import { Form, Button, Container } from "react-bootstrap";

const LoginPage = () => {
  const { LoginPOST } = useContext(DataContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="bg-light vh-100">
      <h1 className="text-center pt-4">Prijava</h1>
      <Container className="p-5 mt-5 d-flex justify-content-center flex-column">
        <div className="d-flex flex-column">
          <Form onSubmit={(e) => LoginPOST(e, username, password)}>
            <Form.Group controlId="formText" className="mb-3">
              <Form.Label>Korisničko ime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite korisničko ime"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Unesite password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              className="mt-2 mb-4"
              variant="success"
              type="submit"
              /* onClick={() => LoginPOST(username, password)} */
            >
              Potvrdi
            </Button>
          </Form>
        </div>

        <Link className="mb-3 text-decoration-none" to="/nova-lozinka">
          Zaboravili ste lozinku?
        </Link>

        <div className="text-center">
          <Link to="/registracija/korisnik">
            <Button variant="success mx-3">Registracija - Korisnik</Button>
          </Link>
          <Link to="/registracija/agencija">
            <Button variant="success">Registracija - Agencija</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
