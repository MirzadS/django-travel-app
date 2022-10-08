import React, { useEffect } from "react";
import { useContext } from "react";
import DataContext from "../context/DataContext";

import PlannedTravelsCard from "./PlannedTravelsCard";
import Header from "./Header";

import {
  Button,
  Container,
  Row,
  Table,
  Form,
  FormControl,
} from "react-bootstrap";

const PlannedTravels = () => {
  const {
    plannedTravelsData,
    PlannedTravelsFun,
    token,
    tripRequestsData,
    odobriZahtjev,
    odbijZahtjev,
    search,
    setSearch,
  } = useContext(DataContext);

  useEffect(() => {
    PlannedTravelsFun();
  }, []);

  return (
    <>
      <Header />

      <Container className="my-5">
        <br />
        <br />
        <br />

        {token?.role == 987 && (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Ime grada</th>
                  <th>Datum polaska</th>
                  <th>Datum dolaska</th>
                  <th>Dopusti</th>
                  <th>Odbij</th>
                </tr>
              </thead>
              <tbody>
                {tripRequestsData.map(
                  ({ id, email, title, start_date, end_date }) => (
                    <tr key={id}>
                      <td>{email}</td>
                      <td>{title}</td>
                      <td>{start_date}</td>
                      <td>{end_date}</td>
                      <td>
                        <Button
                          variant="success"
                          onClick={() => odobriZahtjev(id)}
                        >
                          Dopusti
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => odbijZahtjev(id)}
                        >
                          Odbij
                        </Button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>

            <br />
            <br />
            <br />
            <br />
          </>
        )}

        <Form className="d-flex w-50 mx-auto">
          <FormControl
            type="search"
            placeholder="Traži..."
            className="me-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search"
          />
        </Form>

        <br />
        <br />

        <Row>
          {plannedTravelsData.map(
            ({
              id,
              city_name,
              image,
              description,
              agency,
              type_of_travel,
              start_date,
              end_date,
              status,
            }) => (
              <PlannedTravelsCard
                key={id}
                id={id}
                image={image}
                city_name={city_name}
                type_of_travel={type_of_travel}
                description={description}
                agency={agency}
                start_date={start_date}
                end_date={end_date}
                status={status}
              />
            )
          )}
        </Row>
      </Container>
    </>
  );
};

export default PlannedTravels;
