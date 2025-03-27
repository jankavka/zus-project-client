import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SchoolAchievements from "./static_content/SchoolAchievementsIndex";
import NavigationLinks from "./components/NavigationLinks";
import BasicDataIndex from "./static_content/BasicDataIndex";
import HistoryAndPresentIndex from "./static_content/HistoryAndPresentIndex";
import StudyFocusIndex from "./static_content/StudyFocusIndex";

function App() {
  return (
    <div>
      <Router>
        <NavigationLinks/>
        <div className="img-bg-school position-logo">
          <img id="logo" src="/src/images/logo f2.png" alt="" />
        </div>
        <Routes>
          <Route index element={<Navigate to={"/Domu"} />} />
          <Route path="/zakladni-udaje">
            <Route index element={<BasicDataIndex/>} />
          </Route>
          <Route path="/uspechy-skoly">
            <Route index element={<SchoolAchievements/>}/>
          </Route>
          <Route path="/historie-a-soucasnost">
            <Route index element={<HistoryAndPresentIndex/>}/>
          </Route>
          <Route path="/studijni-zamereni">
            <Route index element={<StudyFocusIndex/>}/>
          </Route>
          <Route path="/kontakty">

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
