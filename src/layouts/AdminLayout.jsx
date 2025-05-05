import React from "react";
import ArticlesIndex from "../pages/public/ArticlesIndex";
import { Routes, Route } from "react-router-dom";
import {
  BasicDataIndex,
  GroupTrainingScheduleIndex,
  HistoryAndPresentIndex,
  MusicTheoryIndex,
  PersonalDataProtectionIndex,
  RequiredInforamtionIndex,
  SchoolFeeIndex,
  StudyFocusIndex,
} from "../pages/public/StaticContent";
import SchoolAchievementsIndex from "../pages/public/SchoolAchievementsIndex";
import FotoIndex from "../pages/public/FotoIndex";
import VideoIndex from "../pages/public/VideoIndex";
import SchoolRulesIndex from "../pages/public/ShoolRulesIndex";
import AnualReportIndex from "../pages/public/AnualReportIndex";
import SchoolManagementIndex from "../pages/public/SchoolManagementIndex";
import TeachersIndex from "../pages/public/TeachersIndex";
import AdminNavLinks from "../components/AdminNavLinks";

const AdminLayout = () => {
  return (
    <div className="">
      <AdminNavLinks />
      <div className="container-main">
        <h1 className="mt-5 text-center">Toto je stránka admina</h1>
        <Routes>
          <Route path="/o-skole/aktuality" element={<ArticlesIndex />} />
          <Route path="/o-skole/zakladni-udaje" element={<BasicDataIndex />} />
          <Route
            path="/o-skole/historie-a-soucasnost"
            element={<HistoryAndPresentIndex />}
          />
          <Route
            path="/o-skole/studijni-zamereni"
            element={<StudyFocusIndex />}
          />
          <Route path="/o-skole/základni-udaje" element={<BasicDataIndex />} />
          <Route
            path="/o-skole/uspechy-skoly"
            element={<SchoolAchievementsIndex />}
          />

          <Route
            path="/pro-rodice-a-zaky/rozvrh-kolektivni-vyuky"
            element={<GroupTrainingScheduleIndex />}
          />
          <Route
            path="/pro-rodice-a-zaky/hudebni-nauka"
            element={<MusicTheoryIndex />}
          />
          <Route
            path="/pro/rodice-a-zaky/skolne"
            element={<SchoolFeeIndex />}
          />

          <Route path="/galerie/foto" element={<FotoIndex />} />
          <Route path="/galerie/video" element={<VideoIndex />} />

          <Route
            path="/uredni-deska/ochrana-osobnich-udaju"
            element={<PersonalDataProtectionIndex />}
          />
          <Route
            path="/uredni-deska/povinne-zverejnovane/informace"
            element={<RequiredInforamtionIndex />}
          />
          <Route
            path="/uredni-deska/skolni-rad"
            element={<SchoolRulesIndex />}
          />
          <Route
            path="uredni-deska/vyrocni-zpravy"
            element={<AnualReportIndex />}
          />

          <Route
            path="/kontakty/vedeni-skoly"
            element={<SchoolManagementIndex />}
          />
          <Route path="/kontakty/ucitele" element={<TeachersIndex />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
