import React from "react";
import ArticlesIndex from "../pages/public/ArticlesIndex";
import { Routes, Route, Navigate } from "react-router-dom";
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
import SchoolManagementDeatil from "../pages/public/SchoolManagementDetail";
import HistoryAndPresentForm from "../pages/admin/HistoryAndPresentForm";
import RequiredInforamtionForm from "../pages/admin/RequiredInformationForm";
import GroupTrainingScheduleForm from "../pages/admin/GroupTrainingScheduleForm";
import MusicTheoryForm from "../pages/admin/MusicTheoryForm";
import SchoolFeeForm from "../pages/admin/SchoolFeeForm";
import PersonalDataProtectionForm from "../pages/admin/PersonalDataProtectionForm";
import SchoolYearIndex from "../pages/admin/SchoolYearIndex";
import SchoolEducationProgramIndex from "../pages/public/SchoolEducationProgramIndex";
import SchoolAchievementForm from "../pages/admin/SchoolAchievementForm";
import AlbumForm from "../pages/admin/AlbumForm";
import ImagesForm from "../pages/admin/ImagesForm";
import AdminFotoIndex from "../pages/admin/AdminFotoIndex";
import AdminAlbumDetail from "../pages/admin/AdminAlbumDetail";

const AdminLayout = () => {
  return (
    <div>
      <AdminNavLinks />
      <div className="container-main">
        <h1 className="text-center">ADMIN</h1>
        <Routes>
          <Route index element={<Navigate to={"/admin/o-skole/aktuality"} />}/>
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
            element={<HistoryAndPresentIndex isEditable={true} />}
          />
          <Route
            path="/o-skole/historie-a-soucasnost/upravit"
            element={<HistoryAndPresentForm />}
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
          <Route path="/o-skole/zakladni-udaje" element={<BasicDataIndex />} />
          <Route
            path="/o-skole/uspechy-skoly"
            element={<SchoolAchievementsIndex forAdmin={true} />}
          />
          <Route
            path="/o-skole/uspechy-skoly/upravit"
            element={<SchoolAchievementForm/>}
          />
          <Route
            path="/o-skole/uspechy-skoly/:id/upravit"
            element={<SchoolAchievementForm/>}
          />
          <Route
            path="/o-skole/uspechy-skoly/skolni-roky"
            element={<SchoolYearIndex />}
          />

          <Route
            path="/pro-rodice-a-zaky/rozvrh-kolektivni-vyuky"
            element={<GroupTrainingScheduleIndex isEditable={true} />}
          />
          <Route
            path="/pro-rodice-a-zaky/rozvrh-kolektivni-vyuky/upravit"
            element={<GroupTrainingScheduleForm />}
          />
          <Route
            path="/pro-rodice-a-zaky/hudebni-nauka"
            element={<MusicTheoryIndex isEditable={true} />}
          />
          <Route
            path="/pro-rodice-a-zaky/hudebni-nauka/upravit"
            element={<MusicTheoryForm />}
          />
          <Route
            path="/pro-rodice-a-zaky/skolne"
            element={<SchoolFeeIndex isEditable={true} />}
          />
          <Route
            path="/pro-rodice-a-zaky/skolne/upravit"
            element={<SchoolFeeForm />}
          />
          <Route path="/galerie/foto" element={<AdminFotoIndex isEditable={true}/>} />
          <Route path="/galerie/foto/nove-album" element={<AlbumForm/>}/>
          <Route path="/galerie/foto/:albumName" element={<AdminAlbumDetail/>}/>
          <Route path="/galerie/foto/pridat-foto" element={<ImagesForm/>} />
          <Route path="/galerie/foto/upravit-album/:albumNameParam" element={<AlbumForm/>}/>
          <Route path="/galerie/foto/pridat-foto/:albumNameParam" element={<ImagesForm/>}/>
          <Route path="/galerie/video" element={<VideoIndex />} />

          <Route
            path="/uredni-deska/ochrana-osobnich-udaju"
            element={<PersonalDataProtectionIndex isEditable={true} />}
          />
          <Route
            path="/uredni-deska/ochrana-osobnich-udaju/upravit"
            element={<PersonalDataProtectionForm />}
          />
          <Route
            path="/uredni-deska/povinne-info"
            element={<RequiredInforamtionIndex isEditable={true} />}
          />
          <Route
            path="/uredni-deska/povinne-info/upravit"
            element={<RequiredInforamtionForm />}
          />
          <Route
            path="/uredni-deska/skolni-rad"
            element={<SchoolRulesIndex />}
          />
          <Route
            path="/uredni-deska/skolni-vzdelavaci-program"
            element={<SchoolEducationProgramIndex isEditable={true} />}
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
              path="/kontakty/vedeni-skoly/:id"
              element={<SchoolManagementDeatil isEditable={true} />}
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
