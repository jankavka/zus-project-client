import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { apiGet } from "../../utils/api";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const SchoolEducationProgramIndex = ({ isEditable }) => {
  const location = useLocation();
  const { successState } = location.state || false;
  const [schoolEducationProgram, setSchoolEducationProgram] = useState({});
  const [loadingErrorState, setLoadingErrorState] = useState(false);

  useEffect(() => {
    apiGet("/api/static/school-education-program")
      .then((data) => setSchoolEducationProgram(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);
  return (
    <div className="container-content">
      <h5 className="text-uppercase">Školní vzdělávací program</h5>
      <FlashMessage
        success={true}
        state={successState}
        text={messages.dataUpdateOk}
      />
      <FlashMessage
        success={false}
        state={loadingErrorState}
        text={messages.dataLoadErr}
      />
      {isEditable ? (
        <Link
          className="btn btn-success"
          to={"/admin/uredni-deska/skolni-vzdelavaci-program/upravit"}
        >
          Upravit
        </Link>
      ) : null}
      <div
        dangerouslySetInnerHTML={{ __html: schoolEducationProgram.content }}
      ></div>
    </div>
  );
};

export default SchoolEducationProgramIndex;
