import React from "react";
import ReactDOM from "react-dom/client";
import "./app/index.css";
import App from "./app/App";
import { RouterProvider } from "react-router-dom";
import { createHashRouter } from "react-router-dom";
import { ProfileScreen } from "./pages/profile/profileScreen/ProfileScreen";
import { ProductsScreen } from "./pages/products/productsScreen/ProductsScreen";
import { ProductCartScreen } from "./pages/ProductCartScreen/ProductCartScreen";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/profile",
        element: <ProfileScreen />,
      },
      {
        path: "/gods",
        element: <ProductsScreen />,
      },
      {
        path: "/cart",
        element: <ProductCartScreen />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
