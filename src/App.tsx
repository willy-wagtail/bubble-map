import React from "react";

import "./App.css";
import PointsOnMap from "./components/PointsOnMap";
import { useWorldAtlas } from "./hooks/useWorldAtlas";
import { useWorldCities } from "./hooks/useWorldCities";

const width = 960;
const height = 500;

export default function App() {
  const worldAtlas = useWorldAtlas();
  const cities = useWorldCities();

  if (!worldAtlas || !cities) {
    return <pre>Loading...</pre>;
  }

  return (
    <svg width={width} height={height}>
      <PointsOnMap
        worldAtlas={worldAtlas}
        cities={cities}
      />
    </svg>
  );
}
