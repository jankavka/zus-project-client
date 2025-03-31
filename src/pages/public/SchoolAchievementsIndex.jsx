import React, { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";

const SchoolAchievementsIndex = () => {
  const [schoolAchievements, setSchoolAchievements] = useState({});

  useEffect(() => {
    apiGet("/api/school-achievements/2").then((data) =>
      setSchoolAchievements(data)
    );
  }, []);

  return (
    <div className="container-content">
        <h1>Úspěchy školy</h1>
        <br />
        {schoolAchievements? <p>{schoolAchievements.title}</p> : null}
    </div>
  );
};

export default SchoolAchievementsIndex;
