import React from "react";
import { geoNaturalEarth1, geoPath, geoGraticule, scaleSqrt, max } from "d3";

import "./PointsOnMap.css";
import { WorldAtlasData } from "../hooks/useWorldAtlas";
import { City } from "../hooks/useWorldCities";

export type PointsOnMapProps = {
  worldAtlas: WorldAtlasData;
  cities: City[];
};

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticules = geoGraticule();

const graticulesPath = path(graticules());
const globeOutlinePath = path({ type: "Sphere" });

const pointSizeMaxRadius = 15;
const pointSizeMaxDomain = 50000000;
const population = (d: City) => d.population;

export default function PointsOnMap({
  worldAtlas: { land, interiors },
  cities,
}: PointsOnMapProps) {
  const interiorsPath = path(interiors);

  const maxDomain = max(cities, population) || pointSizeMaxDomain;

  const pointSizeScale = scaleSqrt()
    .domain([0, maxDomain])
    .range([0, pointSizeMaxRadius]);

  return (
    <g className="marks">
      {globeOutlinePath !== null ? (
        <path className="globeOutline" d={globeOutlinePath} />
      ) : null}

      {graticulesPath !== null ? (
        <path className="graticules" d={graticulesPath} />
      ) : null}

      {land.features.map((feature) => {
        const pathD = path(feature);

        return pathD !== null ? <path className="land" d={pathD} /> : null;
      })}

      {interiorsPath !== null ? (
        <path className="interiors" d={interiorsPath} />
      ) : null}

      {cities.map((city) => {
        const xyCoordinates = projection([city.lng, city.lat]);

        if (xyCoordinates === null) {
          return null;
        }

        return (
          <circle
            cx={xyCoordinates[0]}
            cy={xyCoordinates[1]}
            r={pointSizeScale(population(city))}
          />
        );
      })}
    </g>
  );
}
