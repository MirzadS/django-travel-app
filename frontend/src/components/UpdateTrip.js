import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";

import { useContext } from "react";
import DataContext from "../context/DataContext";

import { useParams, useHistory } from "react-router-dom";

import api from "../api/axios";

import Header from "./Header";

const UpdateTrip = () => {
  const history = useHistory();
  const { id } = useParams();
  const { saveChangesForTrip } = useContext(DataContext);

  const [updateTripData, setUpdateTripData] = useState({});

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minNumber, setMinNumber] = useState("");
  const [maxNumber, setMaxNumber] = useState("");
  const [image, setImage] = useState(null);

  const updateTripFun = (id) => {
    // alert("Uredi putovanje:" + id);

    api
      .get(`/putovanja/uredi-putovanje/${id}`)
      .then((res) => {
        setUpdateTripData(res.data);
        // alert(JSON.stringify(res.data));

        setTitle(res.data.title);
        setDescription(res.data.description);
        setStartDate(res.data.departure_date);
        setEndDate(res.data.arrival_date);
        setMinNumber(res.data.min_number);
        setMaxNumber(res.data.max_number);
      })
      .catch((err) => history.push("/pocetna"));
  };

  useEffect(() => {
    updateTripFun(id);
  }, []);

  return (
    <div className="bg-light vh-100">
      <Header />
      <h1 className="text-center pt-4">Izmjena podataka o putovanju</h1>
      <Container className="p-5 mt-2 d-flex justify-content-center flex-column">
        <div className="d-flex flex-column">
          <Form
            onSubmit={(e) =>
              saveChangesForTrip(
                e,
                id,
                title,
                description,
                startDate,
                endDate,
                minNumber,
                maxNumber,
                image
              )
            }
          >
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>Grad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite ime grada"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Opis</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                placeholder="Unesite opis"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="start_date" className="mb-3">
              <Form.Label>Datum polaska</Form.Label>
              <Form.Control
                type="date"
                placeholder="Unesite datum polaska"
                name="start_date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="end_date" className="mb-3">
              <Form.Label>Datum dolaska</Form.Label>
              <Form.Control
                type="date"
                placeholder="Unesite datum dolaska"
                name="end_date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="min_number" className="mb-3">
              <Form.Label>Minimalan broj</Form.Label>
              <Form.Control
                type="number"
                placeholder="Unesite min broj putnika"
                name="min_number"
                value={minNumber}
                onChange={(e) => setMinNumber(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="max_number" className="mb-3">
              <Form.Label>Maximalan broj</Form.Label>
              <Form.Control
                type="number"
                placeholder="Unesite max broj putnika"
                name="max_number"
                value={maxNumber}
                onChange={(e) => setMaxNumber(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Fotografija</Form.Label>
              <Form.Control
                type="file"
                placeholder="Dodajte fotografiju"
                name="image"
                // value={image}
                onChange={(e) => setImage(e.target.files[0])}
                // required
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Spasi izmjene
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default UpdateTrip;
