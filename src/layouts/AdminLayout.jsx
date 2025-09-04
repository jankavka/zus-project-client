import React, { useEffect } from "react";
import ArticlesIndex from "../pages/public/ArticlesIndex";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
import SchoolEducationProgramIndex from "../pages/public/SchoolEducationProgramIndex";
import SchoolAchievementForm from "../pages/admin/SchoolAchievementForm";
import AlbumForm from "../pages/admin/AlbumForm";
import ImagesForm from "../pages/admin/ImagesForm";
import AdminAlbumIndex from "../pages/admin/AdminAlbumIndex";
import AdminAlbumDetail from "../pages/admin/AdminAlbumDetail";
import NotFound from "../pages/public/NotFound";
import { useSession } from "../contexts/session";
import { apiDelete } from "../utils/api";
import useMedia from "use-media";
import EntranceExamIndex from "../pages/public/EntranceExamIndex";
import GeneralInformation from "../pages/public/GeneralInformation";
import ArticleDetail from "../pages/public/ArticleDetail";
import SchoolSupportIndex from "../pages/public/SchoolSupportIndex";
import SchoolSupportForm from "../pages/admin/SchoolSupportForm";
import EntranceExamForm from "../pages/admin/EntranceExamForm";
import Files from "../pages/admin/Files";
import FilesForm from "../pages/admin/FilesForm";
import SchoolYearForm from "../pages/admin/SchoolYearForm";
import AnualReportForm from "../pages/admin/AnualReportForm";
import SchoolEducationProgramForm from "../pages/admin/SchoolEducationProgramForm";
import SchoolRulesForm from "../pages/admin/SchoolRulesForm";

const AdminLayout = () => {
  const { session, setSession } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutClick = async () => {
    await apiDelete("/api/auth");
    setSession({ data: null, status: "unauthorized" });
    localStorage.removeItem("lastAdminPath");
    navigate("/admin/login");
  };
  const isMobile = useMedia({ maxWidth: "767px" });

  useEffect(() => {
    if (
      location.pathname.startsWith("/admin") &&
      location.pathname !== "/admin/login" &&
      location.pathname !== "/admin"
    ) {
      localStorage.setItem("lastAdminPath", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div>
      <AdminNavLinks />
      <div className="container-main">
        <div
          className={`d-flex-column mb-3 justify-content-center text-align-center text-center ${
            isMobile ? "" : "col-9"
          }`}
        >
          <h1 className="text-center">ADMIN</h1>
          <small className="">Přihlášený uživatel: {session.data.email}</small>
        </div>
        <div className={`text-center mb-2 ${isMobile ? "" : "col-9"}`}>
          <button onClick={handleLogoutClick} className="btn btn-light">
            Odhlásit
          </button>
        </div>

        <Routes>
          <Route
            path="/admin"
            element={
              <Navigate
                to={
                  localStorage.getItem("lastAdminPath") ||
                  "/admin/uvod/aktuality"
                }
                replace
              />
            }
          />

          <Route>
            <Route
              path="/uvod/aktuality"
              element={<ArticlesIndex isEditable={true} />}
            />
            <Route
              path="/uvod/aktuality/:id"
              element={<ArticleDetail isAdmin={true} />}
            />
            <Route
              path="/uvod/aktuality/:id/upravit"
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
              element={<StudyFocusIndex isEditable={true} />}
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
            element={<SchoolAchievementForm />}
          />
          <Route
            path="/o-skole/uspechy-skoly/:id/upravit"
            element={<SchoolAchievementForm />}
          />
          <Route
            path="/o-skole/uspechy-skoly/skolni-roky"
            element={<SchoolYearForm />}
          />

          <Route
            path="/pro-rodice-a-zaky/prijimaci-zkousky"
            element={<EntranceExamIndex isEditable={true} />}
          />

          <Route
            path="/pro-rodice-a-zaky/prijimaci-zkousky/upravit"
            element={<EntranceExamForm />}
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
          <Route
            path="/galerie/foto"
            element={<AdminAlbumIndex isEditable={true} />}
          />
          <Route path="/galerie/foto/nove-album" element={<AlbumForm />} />
          <Route
            path="/galerie/foto/:albumName"
            element={<AdminAlbumDetail />}
          />
          <Route path="/galerie/foto/pridat-foto" element={<ImagesForm />} />
          <Route
            path="/galerie/foto/upravit-album/:albumNameParam"
            element={<AlbumForm />}
          />
          <Route
            path="/galerie/foto/pridat-foto/:albumNameParam"
            element={<ImagesForm />}
          />
          <Route path="/galerie/video" element={<VideoIndex />} />

          <Route path="/galerie/soubory" element={<Files />} />
          <Route path="/galerie/soubory/novy" element={<FilesForm />} />

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
            element={<SchoolRulesIndex isEditable={true} />}
          />
          <Route
            path="/uredni-deska/skolni-rad/upravit"
            element={<SchoolRulesForm />}
          />
          <Route
            path="/uredni-deska/skolni-vzdelavaci-program"
            element={<SchoolEducationProgramIndex isEditable={true} />}
          />
          <Route
            path="/uredni-deska/skolni-vzdelavaci-program/upravit"
            element={<SchoolEducationProgramForm />}
          />
          <Route
            path="/uredni-deska/vyrocni-zpravy"
            element={<AnualReportIndex isEditable={true} />}
          />

          <Route
            path="/uredni-deska/vyrocni-zpravy/upravit"
            element={<AnualReportForm />}
          />

          <Route>
            <Route
              path="/kontakty/obecne-info"
              element={<GeneralInformation isEditable={true} />}
            />
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
          <Route
            path="/podpora-skoly"
            element={<SchoolSupportIndex isEditable={true} />}
          />
          <Route
            path="/podpora-skoly/upravit"
            element={<SchoolSupportForm />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
