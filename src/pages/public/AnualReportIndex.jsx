import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { apiGet } from "../../utils/api";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const AnualReportIndex = () => {
  const [anualReport, setAnualReport] = useState({});
  const [loadinErrorState, setLoadingErrorState] = useState(false);
  const location = useLocation();
  const { successState } = location.state || false;

  useEffect(() => {
    apiGet("/api/static/anual-report")
      .then((data) => setAnualReport(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  return (
    <div className="text-uppercase container-content">
      <h5>Výroční zprávy</h5>
      <FlashMessage
        success={true}
        state={successState}
        text={messages.dataUpdateOk}
      />
      <FlashMessage
        success={false}
        state={loadinErrorState}
        text={messages.dataLoadErr}
      />
      <Link
        className="btn btn-success"
        to={"/admin/uredni-deska/vyrocni-zpravy/upravit"}
      >
        Upravit
      </Link>
      <div dangerouslySetInnerHTML={{ __html: anualReport.content }}></div>
    </div>
  );
};

export default AnualReportIndex;
