import React from "react";
import "./App.css";
import { ProductsListExample } from "src/pages/page/productListExample/ProductListExample";
import { RangeSlider } from "src/features/rangeSlider/RangeSlider";

function App() {
  return (

  <div
    style={{display: 'flex', justifyContent: 'center'}}
  >
    <RangeSlider
      max={100}
      min={0}
      step={1}
    ></RangeSlider>;
  </div>
  ) 
}

export default App;
