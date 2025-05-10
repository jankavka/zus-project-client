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
import ArticleForm from "../pages/admin/ArticleForm";
import StudyFocusForm from "../pages/admin/StudyFocusForm";
import BasicDataForm from "../pages/admin/BasicDataForm";
import SchoolManagementForm from "../pages/admin/SchoolManagementForm";
import TeacherForm from "../pages/admin/TeacherForm";

const AdminLayout = () => {
  return (
    <div>
      <AdminNavLinks />
      <div className="container-main">
        <h1 className="text-center">ADMIN</h1>
        <Routes>
          <Route>
            <Route
              path="/o-skole/aktuality"
              element={<ArticlesIndex isEditable={true} />}
            />
            <Route
              path="/o-skole/aktuality/:id/upravit"
              element={<ArticleForm />}
            />
            <Route path="/o-skole/aktuality/novy" element={<ArticleForm />} />
          </Route>
          <Route>
            <Route
              path="/o-skole/zakladni-udaje"
              element={<BasicDataIndex isEditable={true} />}
            />
            <Route
              path="/o-skole/zakladni-udaje/upravit"
              element={<BasicDataForm />}
            />
          </Route>
          <Route
            path="/o-skole/historie-a-soucasnost"
            element={<HistoryAndPresentIndex />}
          />
          <Route>
            <Route
              path="/o-skole/studijni-zamereni"
              element={<StudyFocusIndex />}
            />
            <Route
              path="/o-skole/studijni-zamereni/upravit"
              element={<StudyFocusForm />}
            />
          </Route>
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
            path="/pro-rodice-a-zaky/skolne"
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
          <Route>
            <Route
              path="/kontakty/vedeni-skoly"
              element={<SchoolManagementIndex isEditable={true} />}
            />
            <Route
              path="/kontakty/vedeni-skoly/novy"
              element={<SchoolManagementForm />}
            />
            <Route
              path="/kontakty/vedeni-skoly/:id/upravit"
              element={<SchoolManagementForm />}
            />
          </Route>
          <Route>
            <Route
              path="/kontakty/ucitele"
              element={<TeachersIndex isEditable={true} />}
            />
            <Route path="/kontakty/ucitele/novy" element={<TeacherForm />} />
            <Route
              path="/kontakty/ucitele/:id/upravit"
              element={<TeacherForm />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
