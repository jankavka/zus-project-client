import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SessionProvider } from "./contexts/session.jsx";
//import * as bootstrap from "bootstrap";
//import { SessionProvider } from "./contexts/session.jsx";

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <SessionProvider>
    <App />
  </SessionProvider>

  //</StrictMode>,
);
