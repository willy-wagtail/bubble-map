import { useEffect, useState } from "react";
import { csv } from "d3";
import { FeatureCollection, MultiLineString } from "geojson";

export type WorldCitiesData = {
  land: FeatureCollection;
  interiors: MultiLineString;
};

const worldCitiesUrl =
  "https://gist.githubusercontent.com/willy-wagtail/8e035ecce41d12c98dbbdb33e42e89f4/raw/6d058d6c3f0e6002725ade03d15041e63a59379c/world_cities.csv";

const transform = (d: any) => ({
  ...d,
  lat: +d.lat,
  lng: +d.lng,
});

export const useWorldCities = () => {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    csv<any>(worldCitiesUrl, transform)
      .then(setData)
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return data;
};
