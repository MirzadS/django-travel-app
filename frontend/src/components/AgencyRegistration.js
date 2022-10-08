import React, { useState } from "react";

import { useContext } from "react";
import DataContext from "../context/DataContext";

import { Form, Button, Container } from "react-bootstrap";

const AgencyRegistration = () => {
  const { AgencyRegistrationPOST } = useContext(DataContext);

  const [agencyName, setAgencyName] = useState("");
  const [email, setEmail] = useState("");
  const [established, setEstablished] = useState("");
  const [password_1, setPassword_1] = useState("");
  const [password_2, setPassword_2] = useState("");

  return (
    <div className="bg-light vh-100">
      <h1 className="text-center pt-4">Registracija - Agencija</h1>
      <Container className="p-5 mt-2 d-flex justify-content-center flex-column">
        <div className="d-flex flex-column">
          <Form
            onSubmit={(e) =>
              AgencyRegistrationPOST(
                e,
                agencyName,
                email,
                established,
                password_1,
                password_2
              )
            }
          >
            <Form.Group controlId="agency_name" className="mb-3">
              <Form.Label>Naziv agencije</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite naziv agencije"
                name="agency_name"
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Unesite email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="established" className="mb-3">
              <Form.Label>Datum osnivanja</Form.Label>
              <Form.Control
                type="date"
                placeholder="Unesite datum osnivanja"
                name="established"
                value={established}
                onChange={(e) => setEstablished(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Unesite password"
                name="password"
                value={password_1}
                onChange={(e) => setPassword_1(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="password_2" className="mb-3">
              <Form.Label>Potvrdi password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Potvrdi password"
                name="password_2"
                value={password_2}
                onChange={(e) => setPassword_2(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Registruj agenciju
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default AgencyRegistration;
