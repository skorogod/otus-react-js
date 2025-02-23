import React from "react";
import "./App.css";
import { ResizerExample } from "src/pages/resizerExample/ResizerExample";

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ResizerExample initialHeight={200} initialWidth={400} />
    </div>
  );
}

export default App;
