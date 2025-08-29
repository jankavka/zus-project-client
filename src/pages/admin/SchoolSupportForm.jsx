import { useEffect, useRef, useState } from "react";
import MyEditor from "../../components/MyEditor";
import { useNavigate } from "react-router-dom";
import { apiPut, apiGet } from "../../utils/api";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const SchoolSupportForm = () => {
  const [schoolSupport, setSchoolSupport] = useState({
    title: "",
    content: "",
  });
  const editorRef = useRef();
  const navigate = useNavigate();
  const [loadingErrorState, setLoadingErrorState] = useState(false);
  const [uploadingErrorState, setUploadingErrorState] = useState(false);

  useEffect(() => {
    apiGet("/api/static/school-support")
      .then((data) => setSchoolSupport(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    apiPut("/api/static/update/school-support", schoolSupport)
      .then(() =>
        navigate("/admin/podpora-skoly", { state: { successState: true } })
      )
      .catch((error) => {
        setUploadingErrorState(true);
        console.error(error);
      });
  };


  return (
    <div className="container-content">
      <h5 className="text-uppercase">Podpora školy</h5>
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
      <div className="mb-3">
        <label>Titulek </label>
        <input
          className="form-control"
          type="text"
          value={schoolSupport?.title || " "}
          onChange={(e) =>
            setSchoolSupport({
              ...schoolSupport,
              title: e.target.value,
            })
          }
        />
      </div>
      <div className="mb-3">
        <label>Obsah</label>
        <MyEditor
          editorRef={editorRef}
          subject={schoolSupport}
          onChange={() => {
            setSchoolSupport({
              ...schoolSupport,
              content: editorRef?.current.getContent(),
            });
          }}
        ></MyEditor>
      </div>
      <div>
        <button
          className="btn btn-success me-3"
          onClick={(e) => handleSubmit(e)}
        >
          Uložit
        </button>
        <button
          className="btn btn-info"
          type="button"
          onClick={() => navigate(-1)}
        >
          Zpět
        </button>
      </div>
    </div>
  );
};

export default SchoolSupportForm;
