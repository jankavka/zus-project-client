import { useEffect, useRef, useState } from "react";
import { apiGet, apiPut } from "../../utils/api";
import FormInput from "../../components/FormInput";
import MyEditor from "../../components/MyEditor";
import { useNavigate } from "react-router-dom";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const SchoolRulesForm = () => {
  const editorRef = useRef();
  const [schoolRules, setSchoolRules] = useState({
    title: "",
    content: "",
    issuedDate: "",
  });
  const [loadingErrorState, setLoadingErrorState] = useState(false);
  const navigate = useNavigate();
  const [uploadingErrorState, setUploadingErrorState] = useState(false);

  useEffect(() => {
    apiGet("/api/static/school-rules")
      .then((data) => setSchoolRules(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    apiPut("/api/static/update/school-rules", schoolRules).then(() =>
      navigate("/admin/uredni-deska/skolni-rad", {
        state: { successState: true },
      }).catch((error) => {
        setUploadingErrorState(true);
        console.error(error);
      })
    );
  };

  return (
    <div className="container-content">
      <h5>Školní řád</h5>
      <FlashMessage
        success={false}
        state={loadingErrorState}
        text={messages.dataLoadErr}
      />
      <FlashMessage
        success={false}
        state={uploadingErrorState}
        text={messages.dataUpdateErr}
      />
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <FormInput
            label={"Titulek"}
            name={"title"}
            value={schoolRules.title}
            onChange={(e) =>
              setSchoolRules({ ...schoolRules, title: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <MyEditor
            editorRef={editorRef}
            subject={schoolRules}
            onChange={() =>
              setSchoolRules({
                ...schoolRules,
                content: editorRef.current.getContent(),
              })
            }
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-success" type="submit">
            Uložit
          </button>
        </div>
      </form>
    </div>
  );
};
export default SchoolRulesForm;
