import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import MainPage from "./pages/MainPage";
import ListStudents from "./pages/careers/ListStudents";
import CreateStudent from "./pages/careers/CreateStudent";
import UpdateStudent from "./pages/careers/UpdateStudent";

const NotFound = () => (
  <div className="page-content">
    <h2>404 - Página no encontrada</h2>
    <p>Lo sentimos, la página que buscas no existe.</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/liststudents",
        element: <ListStudents />,
      },
      {
        path: "/liststudents/formstudents",
        element: <CreateStudent />,
      },
      {
        path: "/liststudents/formstudents/:id",
        element: <UpdateStudent />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);