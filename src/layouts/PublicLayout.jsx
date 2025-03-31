import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";

import NavigationLinks from "../components/NavigationLinks";
import ArticlesIndex from "../pages/public/ArticlesIndex";
import ArticleDetail from "../pages/public/ArticleDetail";
import SchoolAchievementsIndex from "../pages/public/SchoolAchievementsIndex"
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

const PublicLayout = () => {

  return (
    <div>
      <NavigationLinks />
      <div className="img-bg-school position-logo">
        <Link to={"/aktuality"}><img id="logo" src="/src/images/logo f2.png" alt="" /></Link>
      </div>
      <Routes>
        <Route index element={<Navigate to={"/aktuality"}/>}/>
        <Route path="/o-skole">
          <Route path="/o-skole/zakladni-udaje" element={<BasicDataIndex />}/>
          <Route path="/o-skole/historie-a-soucasnost" element={<HistoryAndPresentIndex />}/>
          <Route path="/o-skole/studijni-zamereni" element={<StudyFocusIndex />}/>          
          <Route path="/o-skole/uspechy-skoly" element={<SchoolAchievementsIndex />}/>
        </Route>

        <Route path="/pro-rodice-a-zaky">
          <Route path="/pro-rodice-a-zaky/ochrana-osobnich-udaju" element={<PersonalDataProtectionIndex/>} />
          <Route path="/pro-rodice-a-zaky/hudebni-nauka" element={<MusicTheoryIndex/>} />
          <Route path="/pro-rodice-a-zaky/skolne" element={<SchoolFeeIndex/>}/>
        </Route>

        <Route path="/aktuality">
          <Route index element={<ArticlesIndex />} />
          <Route path="/aktuality/:id" element={<ArticleDetail />} />
        </Route>
        <Route path="povinne-info">
          <Route index element />
        </Route>
        <Route path="vedeni-skoly">
          <Route index element />
        </Route>
        <Route path="/studijni-zamereni">
          <Route index element={<StudyFocusIndex />} />
        </Route>
        <Route path="/kontakty"></Route>
      </Routes>
    </div>
  );
};

export default PublicLayout;
