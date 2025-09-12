import { useEffect, useRef, useState } from "react";
import { apiGet, apiPost } from "../../utils/api";
import FormInput from "../../components/FormInput";
import MyEditor from "../../components/MyEditor";
import { useNavigate } from "react-router-dom";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";
import { Spinner } from "react-bootstrap";

const EntranceExamForm = () => {
  //const [isHidden, setIsHidden] = useState(false);
  const [entranceExam, setEntranceExam] = useState({
    title: "",
    content: "",
    hidden: "",
  });
  const editorRef = useRef();
  const navigate = useNavigate();
  const [errorState, setErrorState] = useState(false);
  const [savingErrorState, setSavingErrorState] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    apiGet("/api/entrance-exam")
      .then((data) => setEntranceExam(data))
      .catch((error) => {
        setErrorState(true);
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (timerId === null) return;
    return () => clearTimeout(timerId);
  }, [timerId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitted) return;
    setIsSubmitted(true);
    const timer = setTimeout(() => setIsSubmitted(false), 3000);
    setTimerId(timer);
    apiPost("/api/entrance-exam", entranceExam)
      .then(() =>
        navigate("/admin/pro-rodice-a-zaky/prijimaci-zkousky", {
          state: { successState: true },
        })
      )
      .catch((error) => {
        setSavingErrorState(true);
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        clearTimeout(timer);
      });
  };

  return (
    <div className="container-content">
      <h5 className="text-uppercase mb-3">Přijímací zkoušky</h5>
      <FlashMessage
        success={false}
        state={errorState}
        text={messages.dataLoadErr}
      />
      <FlashMessage
        success={false}
        state={savingErrorState}
        text={messages.dataUpdateErr}
      />
      {isLoading ? <Spinner animation="border" /> : null}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <FormInput
            label="Titulek"
            name="entranceExam"
            value={entranceExam.title}
            onChange={(e) =>
              setEntranceExam((prev) => {
                return { ...prev, title: e.target.value };
              })
            }
          />
        </div>
        <div className="mb-3">
          <label> Obsah</label>
          <MyEditor
            subject={entranceExam}
            editorRef={editorRef}
            onChange={() =>
              setEntranceExam((prev) => {
                return { ...prev, content: editorRef.current.getContent() };
              })
            }
          />
        </div>
        <label>Skryté:</label>
        <div className="form-check mb-3">
          <div id="hidden">
            <input
              onChange={() =>
                setEntranceExam((prev) => {
                  return { ...prev, hidden: true };
                })
              }
              className="form-check-input"
              checked={entranceExam.hidden}
              name="isHidden"
              type="radio"
              id="hidden1"
            />
            <label htmlFor="hidden1" className="form-check-label">
              Ano
            </label>
          </div>
          <div id="hidden">
            <input
              checked={!entranceExam.hidden}
              onChange={() =>
                setEntranceExam((prev) => {
                  return { ...prev, hidden: false };
                })
              }
              className="form-check-input"
              name="isHidden"
              type="radio"
              id="hidden2"
            />
            <label htmlFor="hidden2" className="form-check-label">
              Ne
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-start">
          <button
            className="btn btn-success me-3"
            type="submit"
            disabled={isSubmitted}
          >
            Uložit
          </button>
          <button
            className="btn btn-info"
            onClick={() =>
              navigate("/admin/pro-rodice-a-zaky/prijimaci-zkousky")
            }
          >
            Zpět
          </button>
        </div>
      </form>
    </div>
  );
};
export default EntranceExamForm;
