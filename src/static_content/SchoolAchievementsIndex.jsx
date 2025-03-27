import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";

const SchoolAchievements = () => {
  const [schoolAchievements, setSchoolAchievements] = useState({});

  useEffect(() => {
    apiGet("/api/school-achievements").then((data) =>
      setSchoolAchievements(data)
    );
  }, []);

  return (
    <div className="container-content">
        <h1>Úspěchy školy</h1>
        <br />
        <p>{schoolAchievements.title}</p>
    </div>
  );
};

export default SchoolAchievements;
