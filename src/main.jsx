import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Layout from "./layout/Layout";

import { AuthProvider } from "./auth/AuthContext";
import { ApiProvider } from "./api/ApiContext";
// import { PageProvider } from "./layout/PageContext"; // DELETE THIS IMPORT
import { BrowserRouter } from "react-router-dom"; // IMPORT BrowserRouter

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ApiProvider>
        {/* Wrap Layout and App within BrowserRouter */}
        <BrowserRouter>
          <Layout>
            <App />
          </Layout>
        </BrowserRouter>
      </ApiProvider>
    </AuthProvider>
  </StrictMode>
);
