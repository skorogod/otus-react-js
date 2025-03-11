import React from "react";
import { AddProductForm } from "src/features/forms/productForm/ProductForm";
import { SignUpBlock } from "src/pages/auth/signUpBlock/SignUpBlock";

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <AddProductForm></AddProductForm>
    </div>
  );
}

export default App;
