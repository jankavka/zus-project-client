import { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";
import { Link, useLocation } from "react-router-dom";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

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
        <Link
          className="btn btn-success"
          to={"/admin/pro-rodice-a-zaky/prijimaci-zkousky/upravit"}
        >
          Upravit
        </Link>
      ) : null}
      <div dangerouslySetInnerHTML={{ __html: entranceExam.content }}></div>
    </div>
  );
};
export default EntranceExamIndex;
