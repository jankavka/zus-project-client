import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../../utils/api";
import { Link, useLocation } from "react-router-dom";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const SchoolAchievementsIndex = ({ forAdmin }) => {
  const [schoolAchievements, setSchoolAchievements] = useState([]);
  const [schoolYears, setSchoolYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState({
    id: "",
    schoolYear: "",
  });
  const location = useLocation();
  const { successState } = location.state || false;
  const [loadingErrorState, setLoadingErrorState] = useState(false);
  const [deleteErrorState, setDeleteErrorState] = useState(false);

  useEffect(() => {
    apiGet("/api/school-year")
      //last year has lowest id!!!
      .then((data) => {
        setSchoolYears(data);
        setSelectedYear(data.sort((a, b) => b.id - a.id)[0]);
      })
      .catch((error) => {
        setLoadingErrorState(true);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (selectedYear.id) {
      apiGet(`/api/school-achievements/year/${selectedYear.id}`)
        .then((data) => setSchoolAchievements(data))
        .catch((error) => {
          setLoadingErrorState(true);
          console.log(error);
        });
    }
  }, [selectedYear]);

  const deleteAchievement = (id) => {
    let aprove = confirm("Opravdu chcece smazat položku?");
    if (aprove) {
      apiDelete(`/api/school-achievements/delete/${id}`)
        .then(() =>
          setSchoolAchievements(
            schoolAchievements.filter((item) => item.id != id)
          )
        )
        .catch((error) => {
          setDeleteErrorState(true);
          console.error(error);
        });
    }
  };

  const handleChange = (e) => {
    setSelectedYear({
      id: e.target.value,
    });
  };

  console.log(selectedYear);

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Úspěchy školy</h5>
      <FlashMessage
        success={true}
        state={successState}
        text={messages.dataCreateOk}
      />
      <FlashMessage
        success={false}
        state={loadingErrorState}
        text={messages.dataLoadErr}
      />
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
      <div className="mb-5">
        <label htmlFor="yearSelect">Vyberte rok:</label>
        <select
          value={selectedYear.id || " "}
          className="form-select w-50"
          onChange={(e) => handleChange(e)}
          id="yearSelect"
        >
          <option value="">Vyberte rok</option>
          {schoolYears &&
            schoolYears.map((year, index) => (
              <option value={year.id} key={index}>
                {year.schoolYear}
              </option>
            ))}
        </select>
      </div>
      {schoolAchievements
        ? schoolAchievements.map((item, index) => (
            <div key={index}>
              <h5 style={{ color: "#986545" }}>{item.title}</h5>
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
                    onClick={() => deleteAchievement(item.id)}
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
