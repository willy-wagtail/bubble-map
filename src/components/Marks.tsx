import React from "react";
import { geoEqualEarth, geoPath } from "d3";

import "./Marks.css";
import { WorldAtlasData } from "../hooks/useWorldAtlas";

export type MarksProps = {
  data: WorldAtlasData;
};

const projection = geoEqualEarth();
const path = geoPath(projection);

export default function Marks({ data: { land, interiors } }: MarksProps) {
  const globeOutlinePath = path({ type: "Sphere" });
  const interiorsPath = path(interiors);

  return (
    <g className="marks">
      {globeOutlinePath !== null ? (
        <path className="globeOutline" d={globeOutlinePath} />
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
    </g>
  );
}
