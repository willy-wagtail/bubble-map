import React from "react";
import { geoNaturalEarth1, geoPath, geoGraticule } from "d3";

import "./Marks.css";
import { WorldAtlasData } from "../hooks/useWorldAtlas";

export type MarksProps = {
  worldAtlas: WorldAtlasData;
  cities: any;
  sizeScale: any;
  sizeValue: any;
};

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticules = geoGraticule();

export default function Marks({
  worldAtlas: { land, interiors },
  cities,
  sizeScale,
  sizeValue,
}: MarksProps) {
  const globeOutlinePath = path({ type: "Sphere" });
  const interiorsPath = path(interiors);
  const graticulesPath = path(graticules());

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
        return <circle cx={x} cy={y} r={sizeScale(sizeValue(city))} />;
      })}
    </g>
  );
}
