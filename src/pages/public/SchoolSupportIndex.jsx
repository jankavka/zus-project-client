import { useState, useEffect } from "react";
import { apiGet } from "../../utils/api";
import { Link, useLocation } from "react-router-dom";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const SchoolSupportIndex = ({ isEditable }) => {
  const [schoolSupport, setSchoolSupport] = useState({});
  const [loadingErrorState, setLoadingErrorState] = useState(false);
  const location = useLocation();
  const { successState } = location.state || false;

  useEffect(() => {
    apiGet("/api/static/school-support")
      .then((data) => setSchoolSupport(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  return (
    <div className="container-content">
      <h5 className="text-uppercase mb-3">podpora školy</h5>
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
      <div dangerouslySetInnerHTML={{ __html: schoolSupport.content }}></div>
      {isEditable ? (
        <Link className="btn btn-success" to={"/admin/podpora-skoly/upravit"}>
          Upravit
        </Link>
      ) : null}
    </div>
  );
};

export default SchoolSupportIndex;
