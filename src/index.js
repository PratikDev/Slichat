import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";

// style imports
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStyles } from "../src/styles/Global.styles";

// rBs imports
import Spinner from "react-bootstrap/Spinner";

import { BrowserRouter as BRouter, Routes, Route } from "react-router-dom";

import ErrorPage from "./pages/404";
const Sign = lazy(() => import("./pages/Sign"));
const Home = lazy(() => import("./pages/Home"));

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <GlobalStyles />
    <Suspense
      fallback={
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <Spinner
            animation="border"
            variant="light"
            role="status"
            style={{ width: "7rem", height: "7rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      }
    >
      <BRouter>
        <Routes>
          <Route path="/" element={<Sign />} />
          <Route path="/Home" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BRouter>
    </Suspense>
  </StrictMode>
);
