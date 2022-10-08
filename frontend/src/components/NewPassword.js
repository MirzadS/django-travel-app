import React, { useState } from "react";

import { useContext } from "react";
import DataContext from "../context/DataContext";

import { Form, Button, Container } from "react-bootstrap";

const NewPassword = () => {
  const { NewPassword } = useContext(DataContext);

  const [email, setEmail] = useState("");

  return (
    <div className="bg-light vh-100">
      <h1 className="text-center pt-4">Zaboravljena lozinka</h1>

      <Container className="p-5 mt-5 d-flex justify-content-center flex-column">
        <div className="d-flex flex-column">
          <Form onSubmit={(e) => NewPassword(e, email)}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Unesite Vaš email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              className="mt-2 mb-4"
              variant="success"
              type="submit"
              /* onClick={() => NewPassword(email)} */
            >
              Potvrdi
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default NewPassword;
