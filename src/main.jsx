import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App.jsx";
import Index from "./components/Index.jsx";
import Components from "./components/Components.jsx";
import PostList from "./components/PostList.jsx";
import Create from "./components/Create.jsx";
import Fullpage from "./components/Fullpage.jsx";
import Update from "./components/Update.jsx";
import store from "./redux/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/components",
        element: <Components />,
        children: [
          {
            path: "/components",
            element: <PostList />, // all posts
          },
          {
            path: "/components/:category",
            element: <PostList />, // Category posts
          },
          {
            path: "/components/create",
            element: <Create />, // Create posts
          },
          {
            path: "/components/update/:id",
            element: <Update />, // Update posts
          },
        ],
      },
      {
        path: "fullpage",
        element: <Fullpage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-v2uxotf4m63prh3z.us.auth0.com"
      clientId="7lAbqM1742FQkOAOFpJx8xNiwsZN09Oi"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
