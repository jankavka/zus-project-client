import { useEffect, useRef, useState } from "react";
import { apiGet, apiPut } from "../../utils/api";
import MyEditor from "../../components/MyEditor";
import { useNavigate } from "react-router-dom";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const HistoryAndPresentForm = () => {
  const [historyAndPresent, setHistoryAndPresent] = useState({
    title: "",
    content: "",
  });
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const [loadingErrorState, setLoadingErrorState] = useState(false);
  const [savingErrorState, setSavingErrorState] = useState(false);

  useEffect(() => {
    apiGet("/api/static/history-and-present")
      .then((data) => setHistoryAndPresent(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    apiPut("/api/static/update/history-and-present", historyAndPresent)
      .then(() =>
        navigate("/admin/o-skole/historie-a-soucasnost", {
          state: { successState: true },
        })
      )
      .catch((error) => {
        setSavingErrorState(true);
        console.error(error);
      });
  };

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Historie a současnost</h5>
      <FlashMessage
        success={false}
        state={loadingErrorState}
        text={messages.dataLoadErr}
      />
      <FlashMessage
        success={false}
        state={savingErrorState}
        text={messages.dataUpdateErr}
      />
      <div className="mb-3">
        <label>Titulek </label>
        <input
          className="form-control"
          type="text"
          value={historyAndPresent.title}
          onChange={(e) =>
            setHistoryAndPresent({
              ...historyAndPresent,
              title: e.target.value,
            })
          }
        />
      </div>
      <div className="mb-3">
        <label>Obsah</label>
        <MyEditor
          editorRef={editorRef}
          subject={historyAndPresent}
          onChange={() => {
            setHistoryAndPresent({
              ...historyAndPresent,
              content: editorRef.current.getContent(),
            });
          }}
        ></MyEditor>
      </div>
      <div>
        <button className="btn btn-success me-3" onClick={handleSubmit}>
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
export default HistoryAndPresentForm;
