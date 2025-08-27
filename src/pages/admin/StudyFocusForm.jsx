import { useEffect, useState, useRef } from "react";
import MyEditor from "../../components/MyEditor";
import { apiGet, apiPut } from "../../utils/api";
import formatDate from "../../components/formatDate";
import { useNavigate } from "react-router-dom";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const StudyFocusForm = () => {
  const [studyFocus, setStudyFocus] = useState({
    title: "",
    content: "",
    issuedDate: "",
  });
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const [loadingErrorState, setLoadingErrorState] = useState(false);
  const [uploadingErrorState, setUploadingErrorState] = useState(false);

  useEffect(() => {
    apiGet("/api/static/study-focus")
      .then((data) => setStudyFocus(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(studyFocus);
    apiPut("/api/static/update/study-focus", studyFocus)
      .then(() =>
        navigate("/admin/o-skole/studijni-zamereni", {
          state: { successState: true },
        })
      )
      .catch((error) => {
        setUploadingErrorState(true);
        console.error(error);
      });
  };

  const hadnleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container-content">
      <h5>Studijní zaměření</h5>
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
          <label>Titulek</label>
          <input
            type="text"
            className="form-control"
            value={studyFocus.title}
            onChange={(e) =>
              setStudyFocus({ ...studyFocus, title: e.target.value })
            }
          />
        </div>
        <div>
          <label>Obsah</label>
          <MyEditor
            editorRef={editorRef}
            subject={studyFocus}
            onChange={() =>
              setStudyFocus({
                ...studyFocus,
                content: editorRef.current.getContent(),
              })
            }
          ></MyEditor>
        </div>
        <div>
          <p>Čas změny: {formatDate(new Date(studyFocus.issuedDate))}</p>
        </div>
        <button type="submit" className="btn btn-info">
          Odeslat
        </button>
        <button className="btn btn-warning ms-3" onClick={hadnleGoBack}>
          Zpět
        </button>
      </form>
    </div>
  );
};

export default StudyFocusForm;
