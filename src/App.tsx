import React from "react";

import "./App.css";
import Marks from "./components/Marks";
import { useWorldAtlas } from "./hooks/useWorldAtlas";

const width = 960;
const height = 500;

export default function App() {
  const data = useWorldAtlas();

  if (!data) {
    return <pre>Loading...</pre>;
  }

  return (
    <svg width={width} height={height}>
      <Marks data={data} />
    </svg>
  );
}
