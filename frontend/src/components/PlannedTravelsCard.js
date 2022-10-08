import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const CardComponent = ({
  id,
  city_name,
  description,
  agency,
  type_of_travel,
  image,
  start_date,
  end_date,
  status,
}) => {
  const { token, deletePlannedTrip, updateTrip, tripSingUp } =
    useContext(DataContext);
  const [view, setView] = useState(true);

  return (
    <Card style={{ width: "20rem" }}>
      <Card.Img
        variant="top"
        style={{ objectFit: "cover", height: "12em" }}
        src={"http://localhost:8000" + image}
      />
      <Card.Body>
        <Card.Title className="text-center">{city_name}</Card.Title>
        <Card.Subtitle className="text-center mt-2 mb-2">
          {start_date + "  ---  " + end_date}
        </Card.Subtitle>
        <hr />
        <Card.Text>
          {view ? description.substring(0, 85) + " ..." : description}
          <Button
            variant="link"
            style={{ textDecoration: "none" }}
            onClick={() => setView(!view)}
          >
            {view ? "read more" : "show less"}
          </Button>
        </Card.Text>
        <Card.Text>Tip putovanja: {type_of_travel}</Card.Text>
        <Card.Text>
          {token?.role == 321 && (
            <>
              Status: <b>{status}</b>
            </>
          )}
        </Card.Text>
        <Button
          variant="danger"
          className="mx-2"
          onClick={() => deletePlannedTrip(id, token.user_id, token.role)}
        >
          Izbriši
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
