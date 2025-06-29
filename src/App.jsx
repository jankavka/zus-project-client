import { React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import BackToTopButton from "./components/BackToTopButton";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/*" element={<PublicLayout />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </Router>
      <BackToTopButton/>
    </div>
  );
}

export default App;
