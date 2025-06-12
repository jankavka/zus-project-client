import React from "react";
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
import FotoIndex from "../pages/public/FotoIndex";
import VideoIndex from "../pages/public/VideoIndex";
import SchoolRulesIndex from "../pages/public/ShoolRulesIndex";
import NavLinks from "../components/NavLinks";
import CalendarBasic from "../components/CalendarBasic";
import CalendarComplete from "../pages/public/CalendarComplete";
import SchoolManagementDeatil from "../pages/public/SchoolManagementDetail";
import AlbumDetail from "../pages/public/AlbumDetail";

const PublicLayout = () => {
  return (
    <div>
      <NavLinks />
      <div className="img-bg-school position-logo">
        <Link to={"/o-skole/aktuality"}>
          <img id="logo" src="/src/images/logo f2.png" alt="škola" />
        </Link>
      </div>
      <div className="container-main">
        <div className="row">
          <div className="col-lg-8">
            <Routes>
              <Route index element={<Navigate to={"/o-skole/aktuality"} />} />
              <Route path="/o-skole">
                <Route path="/o-skole/aktuality">
                  <Route index element={<ArticlesIndex isEditable={false} />} />
                  <Route
                    path="/o-skole/aktuality/:id"
                    element={<ArticleDetail />}
                  />
                </Route>
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
              </Route>

              <Route path="/pro-rodice-a-zaky">
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
              </Route>

              <Route path="/galerie">
                <Route
                  path="/galerie/foto"
                  element={<FotoIndex isEditable={false} />}
                />
                <Route path="/galerie/video" element={<VideoIndex />} />
                <Route
                  path="/galerie/foto/:albumName"
                  element={<AlbumDetail isEditable={false} />}
                />
              </Route>

              <Route path="/uredni-deska">
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
              </Route>

              <Route path="/kontakty">
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
              </Route>
              <Route path="/kalendar" index element={<CalendarComplete />} />
            </Routes>
          </div>
          <div className="col-lg-4">
            <CalendarBasic />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicLayout;
