import React, { useState, useEffect } from "react";
import { Form, Button, Container, Dropdown } from "react-bootstrap";

import { useContext } from "react";
import DataContext from "../context/DataContext";

import { useParams, useHistory } from "react-router-dom";

import api from "../api/axios";

import Header from "./Header";

const AddTravel = () => {
  const history = useHistory();

  const { addTravel, token } = useContext(DataContext);

  const [agencyId, setAgencyId] = useState(token.user_id);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [typeOfTravel, setTypeOfTravel] = useState("organizovano");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minNumber, setMinNumber] = useState("");
  const [maxNumber, setMaxNumber] = useState("");
  const [image, setImage] = useState(null);

  //   const updateTripFun = (id) => {
  //     // alert("Uredi putovanje:" + id);

  //     api
  //       .get(`/putovanja/uredi-putovanje/${id}`)
  //       .then((res) => {
  //         setUpdateTripData(res.data);
  //         // alert(JSON.stringify(res.data));

  //         setTitle(res.data.title);
  //         setDescription(res.data.description);
  //         setStartDate(res.data.departure_date);
  //         setEndDate(res.data.arrival_date);
  //         setMinNumber(res.data.min_number);
  //         setMaxNumber(res.data.max_number);
  //       })
  //       .catch((err) =>
  //         // alert(
  //         //   "Greska prilikom ažuriranja putovanja: " + JSON.stringify(err.message)
  //         // )

  //         history.push("/pocetna")
  //       );
  //   };

  //   useEffect(() => {
  //     updateTripFun(id);
  //   }, []);

  return (
    <div className="bg-light vh-100">
      <Header />
      <h1 className="text-center pt-4">Dodaj novo putovanje</h1>
      <Container className="p-5 mt-2 d-flex justify-content-center flex-column">
        <div className="d-flex flex-column">
          <Form
            onSubmit={(e) =>
              addTravel(
                e,
                agencyId,
                title,
                description,
                typeOfTravel,
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

            <Form.Select
              required
              className="mb-3"
              onChange={(e) => setTypeOfTravel(e.target.value)}
            >
              <option
                eventkey="organizovano"
                key="organizovano"
                value="organizovano"
              >
                organizovano
              </option>
              <option eventkey="samostalno" key="samostalno" value="samostalno">
                samostalno
              </option>
            </Form.Select>

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
                onChange={(e) => setImage(e.target.files[0])}
                // required
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Spasi putovanje
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default AddTravel;
