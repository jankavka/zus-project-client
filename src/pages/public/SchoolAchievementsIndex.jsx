import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../../utils/api";
import { Link } from "react-router-dom";

const SchoolAchievementsIndex = ({ forAdmin }) => {
  const [schoolAchievements, setSchoolAchievements] = useState([]);

  useEffect(() => {
    apiGet("/api/school-achievements").then((data) =>
      setSchoolAchievements(data)
    );
  }, []);

  const deleteAchievement = (e, id) => {
    let aprove = confirm("Opravdu chcece smazat položku?");
    if (aprove) {
      apiDelete(`/api/school-achievements/delete/${id}`);
      setSchoolAchievements(schoolAchievements.filter((item) => item.id != id));
    }
  };

  return (
    <div className="container-content">
      <h1>Úspěchy školy</h1>
      {forAdmin ? (
        <div>
          <Link
            className="btn btn-success"
            to={"/admin/o-skole/uspechy-skoly/upravit"}
          >
            Přidat úspěch
          </Link>{" "}
          <Link
            className="btn btn-info"
            to={"/admin/o-skole/uspechy-skoly/skolni-roky"}
          >
            Školní roky
          </Link>{" "}
        </div>
      ) : null}
      <br />
      {schoolAchievements
        ? schoolAchievements.map((item, index) => (
            <div key={index}>
              <h5 style={{color: "#986545"}}>{item.title}</h5>
              <p>Školní rok: {item.schoolYear.schoolYear}</p>
              <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
              {forAdmin ? (
                <div>
                  <Link
                    to={`/admin/o-skole/uspechy-skoly/${item.id}/upravit`}
                    className="btn btn-warning me-3"
                  >
                    Upravit
                  </Link>
                  <button
                    onClick={(e) => deleteAchievement(e, item.id)}
                    className="btn btn-danger"
                  >
                    Vymazat
                  </button>
                </div>
              ) : null}
              <hr />
            </div>
          ))
        : null}
    </div>
  );
};

export default SchoolAchievementsIndex;
