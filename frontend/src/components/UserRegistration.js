import React, { useState } from "react";

import { useContext } from "react";
import DataContext from "../context/DataContext";

import { Form, Button, Container } from "react-bootstrap";

const UserRegistration = () => {
  const { UserRegistrationPOST } = useContext(DataContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password_1, setPassword_1] = useState("");
  const [password_2, setPassword_2] = useState("");
  return (
    <div className="bg-light vh-100">
      <h1 className="text-center pt-4">Registracija - Korisnik</h1>
      <Container className="p-5 mt-2 d-flex justify-content-center flex-column">
        <div className="d-flex flex-column">
          <Form
            onSubmit={(e) =>
              UserRegistrationPOST(
                e,
                firstName,
                lastName,
                username,
                email,
                password_1,
                password_2
              )
            }
          >
            <Form.Group controlId="first_name" className="mb-3">
              <Form.Label>Ime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite ime"
                name="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="last_name" className="mb-3">
              <Form.Label>Prezime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite prezime"
                name="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Korisničko ime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite korisnicko ime"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <Form.Group controlId="password_1" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Unesite password"
                name="password_1"
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
            <Button
              variant="success"
              type="submit"
              /* onClick={() =>
                UserRegistrationPOST(
                  firstName,
                  lastName,
                  username,
                  email,
                  password_1,
                  password_2
                )
              } */
            >
              Registruj korisnika
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default UserRegistration;
