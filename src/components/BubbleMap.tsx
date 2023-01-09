import React, { FC } from "react";
import { geoNaturalEarth1, geoPath, geoGraticule, scaleSqrt, max } from "d3";

import "./BubbleMap.css";
import { WorldAtlasData } from "../hooks/useWorldAtlas";
import { City } from "../hooks/useWorldCities";

export type BubbleMapProps = {
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

const BubbleMap: FC<BubbleMapProps> = ({
  worldAtlas: { land, interiors },
  cities,
}) => {
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

      {land.features.map((feature, index) => {
        const pathD = path(feature);

        return pathD !== null ? (
          <path key={index} className="land" d={pathD} />
        ) : null;
      })}

      {interiorsPath !== null ? (
        <path className="interiors" d={interiorsPath} />
      ) : null}

      {cities.map((city, index) => {
        const xyCoordinates = projection([city.lng, city.lat]);

        if (xyCoordinates === null) {
          return null;
        }

        return (
          <circle
            key={index}
            cx={xyCoordinates[0]}
            cy={xyCoordinates[1]}
            r={pointSizeScale(population(city))}
          />
        );
      })}
    </g>
  );
};

export default BubbleMap;
