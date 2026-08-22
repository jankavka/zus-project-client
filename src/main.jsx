import { createRoot } from "react-dom/client";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import App from "./App.jsx";
import { SessionProvider } from "./contexts/session.jsx";

createRoot(document.getElementById("root")).render(
  <SessionProvider>
    <App />
  </SessionProvider>
);
