import React from "react";
import ReactDOM from "react-dom/client";
import "./app/index.css";
import App from "./app/App";
import { RouterProvider } from "react-router-dom";
import { createHashRouter } from "react-router-dom";
import { ProfileScreen } from "./pages/profile/profileScreen/ProfileScreen";
import { ProductsScreen } from "./pages/products/productsScreen/ProductsScreen";
import { ProductCartScreen } from "./pages/ProductCartScreen/ProductCartScreen";
import { Provider } from "react-redux";
import { store } from "./app/store";
import i18n from "./i18n";
import { SignInBlock } from "./pages/auth/signInBlock/SignInBlock";
import { SignUpBlock } from "./pages/auth/signUpBlock/SignUpBlock";

import { ProtectedComponent } from "./features/protectedComponent/ProtectedComponent";

import { CabinetScreen } from "./pages/cabinet/cabinetScreen/CabinetScreen";

i18n.init();

const router = createHashRouter([
  {
    path: "",
    element: <ProtectedComponent></ProtectedComponent>,
    children: [
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
          {
            path: "/cabinet",
            element: <CabinetScreen />,
          },
        ],
      },
      {
        path: "/signin",
        element: <SignInBlock />,
      },
      {
        path: "/signup",
        element: <SignUpBlock />,
      },
      {
        path: "/signup-test",
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
