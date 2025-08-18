import React, { useEffect } from "react";
import {
  //BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import ArticlesIndex from "../pages/public/ArticlesIndex";
import ArticleDetail from "../pages/public/ArticleDetail";
import SchoolAchievementsIndex from "../pages/public/SchoolAchievementsIndex";
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
import SchoolEducationProgramIndex from "../pages/public/SchoolEducationProgramIndex";
import AnualReportIndex from "../pages/public/AnualReportIndex";
import SchoolManagementIndex from "../pages/public/SchoolManagementIndex";
import TeachersIndex from "../pages/public/TeachersIndex";
import AlbumIndex from "../pages/public/AlbumIndex";
import VideoIndex from "../pages/public/VideoIndex";
import SchoolRulesIndex from "../pages/public/ShoolRulesIndex";
import NavLinks from "../components/NavLinks";
import CalendarBasic from "../components/CalendarBasic";
import CalendarComplete from "../pages/public/CalendarComplete";
import SchoolManagementDeatil from "../pages/public/SchoolManagementDetail";
import AlbumDetail from "../pages/public/AlbumDetail";
import NotFound from "../pages/public/NotFound";
import EntranceExam from "../pages/public/EntranceExam";
import GeneralInformation from "../pages/public/GeneralInformation";
import SchoolSupportIndex from "../pages/public/SchoolSupportIndex";

const PublicLayout = () => {
  return (
    <div>
      <NavLinks />
      <div className="img-bg-school position-logo">
        <Link to={"/uvod/aktuality"}>
          <img id="logo" src="/src/images/logo.png" alt="škola" />
        </Link>
      </div>
      <div className="container-main">
        <div className="row">
          <div className="col-lg-8 col-sm">
            <Routes>
              <Route index element={<Navigate to={"/uvod/aktuality"} />} />

              <Route
                path="/uvod/aktuality"
                element={<ArticlesIndex isEditable={false} />}
              />
              <Route path="/uvod/aktuality/:id" element={<ArticleDetail isAdmin={false} />} />
              <Route
                path="/o-skole/zakladni-udaje"
                element={<BasicDataIndex isEditable={false} />}
              />
              <Route
                path="/o-skole/historie-a-soucasnost"
                element={<HistoryAndPresentIndex isEditable={false} />}
              />
              <Route
                path="/o-skole/studijni-zamereni"
                element={<StudyFocusIndex />}
              />
              <Route
                path="/o-skole/uspechy-skoly"
                element={<SchoolAchievementsIndex forAdmin={false} />}
              />

              <Route
                path="/pro-rodice-a-zaky/prijimaci-zkousky"
                element={<EntranceExam isEditable={false} />}
                
              />

              <Route
                path="/pro-rodice-a-zaky/rozvrh-kolektivni-vyuky"
                element={<GroupTrainingScheduleIndex isEditable={false} />}
              />
              <Route
                path="/pro-rodice-a-zaky/hudebni-nauka"
                element={<MusicTheoryIndex isEditable={false} />}
              />
              <Route
                path="/pro-rodice-a-zaky/skolne"
                element={<SchoolFeeIndex isEditable={false} />}
              />

              <Route path="/galerie/foto" element={<AlbumIndex />} />
              <Route path="/galerie/video" element={<VideoIndex />} />
              <Route
                path="/galerie/foto/:albumName"
                element={<AlbumDetail />}
              />

              <Route
                path="/uredni-deska/ochrana-osobnich-udaju"
                element={<PersonalDataProtectionIndex isEditable={false} />}
              />
              <Route
                path="/uredni-deska/povinne-info"
                element={<RequiredInforamtionIndex isEditable={false} />}
              />
              <Route
                path="/uredni-deska/skolni-vzdelavaci-program"
                element={<SchoolEducationProgramIndex isEditable={false} />}
              />
              <Route
                path="/uredni-deska/vyrocni-zpravy"
                element={<AnualReportIndex />}
              />
              <Route
                path="/uredni-deska/skolni-rad"
                element={<SchoolRulesIndex />}
              />

              <Route
                path="/kontakty/obecne-info"
                element={<GeneralInformation isEditable={false} />}
              />

              <Route
                path="/kontakty/vedeni-skoly"
                element={<SchoolManagementIndex isEditable={false} />}
              />
              <Route
                path="/kontakty/vedeni-skoly/:id"
                element={<SchoolManagementDeatil isEditable={false} />}
              />
              <Route
                path="/kontakty/ucitele"
                element={<TeachersIndex isEditable={false} />}
              />

              <Route path="/kalendar" index element={<CalendarComplete />} />
              <Route
                path="/podpora-skoly"
                element={<SchoolSupportIndex isEditable={false} />}
              />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
          <div className="col-lg-4 col-sm">
            <CalendarBasic />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicLayout;
