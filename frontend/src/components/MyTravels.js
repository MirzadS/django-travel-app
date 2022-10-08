import React, { useState, useEffect } from "react";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { Link } from "react-router-dom";
import api from "../api/axios";

import Header from "./Header";
import MyTravelsCard from "./MyTravelsCard";

import { Button, Container, Row, Form, FormControl } from "react-bootstrap";

const MyTravels = () => {
  const { myTravelsData, myTravels, search, setSearch } =
    useContext(DataContext);

  useEffect(() => {
    myTravels();
  }, []);

  return (
    <>
      <Header />
      <Container className="my-5">
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
          {myTravelsData.map(
            ({
              id,
              city_name,
              image,
              description,
              agency,
              type_of_travel,
              start_date,
              end_date,
              transport_list,
              status,
            }) => (
              <MyTravelsCard
                key={id}
                id={id}
                status={status}
                image={image}
                city_name={city_name}
                type_of_travel={type_of_travel}
                description={description}
                agency={agency}
                start_date={start_date}
                end_date={end_date}
                transport_list={transport_list}
              />
            )
          )}
        </Row>
      </Container>
    </>
  );
};

export default MyTravels;
