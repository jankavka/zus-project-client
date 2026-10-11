import { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";
import { useLocation, Link } from "react-router-dom";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";
import { getSchoolRulesPdfUrl } from "../../utils/schoolRules";

const SchoolRulesIndex = ({ isEditable }) => {
  const location = useLocation();
  const [schoolRules, setSchoolRules] = useState({
    title: "",
    content:""
  });
  const pdfUrl = getSchoolRulesPdfUrl(schoolRules.content);
  const [loadingErrorState, setLoadingErrorState] = useState(false);
  const { successState } = location.state || false;

  useEffect(() => {
    apiGet("/api/static/school-rules")
      .then((data) => {
        setSchoolRules(data);
      })
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  },[]);
  
  return (
    <div className="container-content">
      <h5 className="text-uppercase">Školní řád</h5>
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
          to="/admin/uredni-deska/skolni-rad/upravit"
        >
          Upravit
        </Link>
      ) : null}
      <div className={isEditable ? "mt-3" : ""}>
        {pdfUrl ? (
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            {schoolRules.title || "Školní řád"} (PDF)
          </a>
        ) : isEditable ? (
          <span className="text-muted">
            Není nastaven žádný PDF soubor – položka je v menu skrytá.
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default SchoolRulesIndex;
