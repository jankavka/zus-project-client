import { React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import BackToTopButton from "./components/BackToTopButton";
import LoginPage from "./pages/admin/LoginPage";
import AdminRoute from "./pages/admin/AdminRoute";
import RegistrationForm from "./pages/admin/RegistrationForm";
import ScrollToTop from "./components/ScrollToTop";
import NoAdmin from "./pages/admin/NoAdmin";

function App() {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/*" element={<PublicLayout />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/registrace" element={<RegistrationForm />} />
          <Route path="/admin/no-admin" element={<NoAdmin/>}/>

          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>

      <BackToTopButton />
    </div>
  );
}

export default App;
