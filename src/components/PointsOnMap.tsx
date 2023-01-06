import React from "react";
import { geoNaturalEarth1, geoPath, geoGraticule, scaleSqrt, max } from "d3";

import "./PointsOnMap.css";
import { WorldAtlasData } from "../hooks/useWorldAtlas";

export type PointsOnMapProps = {
  worldAtlas: WorldAtlasData;
  cities: any;
};

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticules = geoGraticule();

const graticulesPath = path(graticules());
const globeOutlinePath = path({ type: "Sphere" });

const pointSizeMaxRadius = 15;
const pointSizeValueAccessor: any = (d: any) => d.population;

export default function PointsOnMap({
  worldAtlas: { land, interiors },
  cities,
}: PointsOnMapProps) {
  const interiorsPath = path(interiors);

  const pointSizeScale = scaleSqrt()
    .domain([0, max(cities, pointSizeValueAccessor) as any])
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

        if (pathD === null) {
          console.warn(
            "The SVG path d attribute calculation returned null for a GeoJsonFeature"
          );

          return "";
        }

        return <path className="land" d={pathD} />;
      })}

      {interiorsPath !== null ? (
        <path className="interiors" d={interiorsPath} />
      ) : null}

      {cities.map((city: any) => {
        const [x, y]: any = projection([city.lng, city.lat]);

        return (
          <circle
            cx={x}
            cy={y}
            r={pointSizeScale(pointSizeValueAccessor(city))}
          />
        );
      })}
    </g>
  );
}
