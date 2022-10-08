import React, { useState } from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
  ZoomableGroup,
} from "react-simple-maps";

import ReactTooltip from "react-tooltip";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const Map = ({ markersBaza }) => {
  const [content, setContent] = useState("");
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <h3 className="my-3">Organizovana putovanja u posljednjih mjesec dana</h3> */}
      <ReactTooltip>{content}</ReactTooltip>

      <div style={{ width: "75%", borderStyle: "double" }}>
        <ComposableMap data-tip="">
          <ZoomableGroup zoom="1">
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const { NAME } = geo.properties;
                      setContent(`${NAME}`);
                    }}
                    onMouseLeave={() => {
                      setContent("");
                    }}
                    style={{
                      hover: {
                        fill: "#F53",
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>
            {markersBaza.map(({ name, coordinates, markerOffset }) => (
              <Marker key={name} coordinates={coordinates}>
                <circle r={3} fill="#F00" stroke="#fff" strokeWidth={1.2} />
                <text
                  textAnchor="middle"
                  y={markerOffset}
                  style={{
                    fontFamily: "system-ui",
                    fill: "#A41606",
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  {name}
                </text>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
};

export default Map;
