import { useEffect, useRef, useState } from "react";
import { apiGet, apiPost } from "../../utils/api";
import FormInput from "../../components/FormInput";
import MyEditor from "../../components/MyEditor";
import { useNavigate } from "react-router-dom";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const EntranceExamForm = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [entranceExam, setEntranceExam] = useState({
    title: "",
    content: "",
    hidden: isHidden,
  });
  const editorRef = useRef();
  const navigate = useNavigate();
  const [errorState, setErrorState] = useState(false);
  const [savingErrorState, setSavingErrorState] = useState(false);

  console.log(entranceExam);

  useEffect(() => {
    apiGet("/api/entrance-exam")
      .then((data) => setEntranceExam(data))
      .catch((error) => {
        setErrorState(true);
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    apiPost("/api/entrance-exam", entranceExam)
      .then(() =>
        navigate("/admin/pro-rodice-a-zaky/prijimaci-zkousky", {
          state: { successState: true },
        })
      )
      .catch((error) => {
        setSavingErrorState(true)
        console.error(error);
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
          <button className="btn btn-success me-3" type="submit">
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
