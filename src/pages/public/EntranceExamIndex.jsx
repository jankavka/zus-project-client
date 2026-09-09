import { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";
import { Link, useLocation } from "react-router-dom";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";
import RichContent from "../../components/RichContent";

const EntranceExamIndex = ({ isEditable }) => {
  const [entranceExam, setEntranceExam] = useState({});
  const [loadingErrorState, setLoadingErrorState] = useState(false);
  const location = useLocation();
  const { successState } = location.state || false;

  useEffect(() => {
    apiGet("/api/entrance-exam")
      .then((data) => setEntranceExam(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Přijímací a talentové zkoušky</h5>
      <FlashMessage
        success={false}
        state={loadingErrorState}
        text={messages.dataLoadErr}
      />
      <FlashMessage
        success={true}
        state={successState}
        text={messages.dataUpdateOk}
      />
      {isEditable ? (
        <div className="mb-3">
          <span
            className={`badge me-3 ${
              entranceExam.hidden ? "text-bg-secondary" : "text-bg-success"
            }`}
          >
            {entranceExam.hidden
              ? "Skryté v hlavním menu"
              : "Viditelné v hlavním menu"}
          </span>
          <Link
            className="btn btn-success"
            to={"/admin/pro-rodice-a-zaky/prijimaci-zkousky/upravit"}
          >
            Upravit
          </Link>
        </div>
      ) : null}
      <RichContent html={entranceExam.content} />
    </div>
  );
};
export default EntranceExamIndex;
