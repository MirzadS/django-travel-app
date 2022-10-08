import React, { useEffect } from "react";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { Link } from "react-router-dom";
import Map from "./Map";
import SpinnerPage from "./SpinnerPage";
import CardComponent from "../components/CardComponent";
import Header from "./Header";

import { Dropdown, Button, Container, Row } from "react-bootstrap";

const HomePage = () => {
  const {
    token,
    deleteToken,
    homePageFun,
    homePageData,
    dropdownTrip,
    setDropdownTrip,
    dropdownList,
  } = useContext(DataContext);

  useEffect(() => {
    homePageFun();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Header />
      {JSON.stringify(homePageData) !== "{}" ? (
        <>
          <Container className="my-5">
            <Row>
              {homePageData.lista_putovanja.map(
                ({
                  id,
                  city_name,
                  image,
                  description,
                  agency,
                  start_date,
                  end_date,
                }) => (
                  <CardComponent
                    key={id}
                    id={id}
                    image={image}
                    city_name={city_name}
                    description={description}
                    agency={agency}
                    start_date={start_date}
                    end_date={end_date}
                  />
                )
              )}
            </Row>
          </Container>
          <h3 className="text-center">
            Organizovana putovanja u posljednjih mjesec dana
          </h3>
          <Map markersBaza={homePageData.markers || []} />

          <br />
          <hr />

          <Dropdown
            onSelect={(val) => dropdownList(val)}
            className="text-center"
          >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Lista završenih putovanja
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {homePageData.zavrsena_putovanja.map(
                ({ destination_id, city_name }) => (
                  <Dropdown.Item
                    eventKey={destination_id}
                    key={destination_id}
                    value={destination_id}
                  >
                    {city_name}
                  </Dropdown.Item>
                )
              )}
            </Dropdown.Menu>
          </Dropdown>

          <br />
          {/* <hr />

          <label>Zavrsena putovanja</label>

          <select onChange={(e) => dropdownList(e.target.value)}>
            {homePageData.zavrsena_putovanja.map(
              ({ destination_id, city_name }) => (
                <option key={destination_id} value={destination_id}>
                  {city_name}
                </option>
              )
            )}
          </select> */}

          {/* <br /> */}

          {dropdownTrip.length !== 0 && (
            <div className="text-center">
              <Map markersBaza={dropdownTrip} />
              <br />
              <Button onClick={(e) => setDropdownTrip([])} variant="primary">
                Ukloni prikazanu mapu
              </Button>
            </div>
          )}
        </>
      ) : (
        <SpinnerPage />
      )}
    </div>
  );
};

export default HomePage;
