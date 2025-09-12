import FormInput from "../../components/FormInput";
import { useEffect, useRef, useState } from "react";
import MyEditor from "../../components/MyEditor";
import { apiGet, apiPut } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";
import formatDate from "../../components/formatDate";
import { Spinner } from "react-bootstrap";

const AnualReportForm = () => {
  const [anualReport, setAnualReport] = useState({
    title: "",
    content: "",
    issuedDate: "",
  });
  const editorRef = useRef();
  const navigate = useNavigate();
  const [uploadingErrorState, setUploadingErrorState] = useState(false);
  const [loadinErrorState, setLoadingErrorState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    apiGet("/api/static/anual-report")
      .then((data) => setAnualReport(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (timerId === null) return;

    return () => clearInterval(timerId);
  }, [timerId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitted) return;
    setIsSubmitted(true);
    const timer = setTimeout(() => setIsSubmitted(false), 3000);
    setTimerId(timer);
    apiPut("/api/static/update/anual-report", anualReport)
      .then(() =>
        navigate("/admin/uredni-deska/vyrocni-zpravy", {
          state: { successState: true },
        })
      )
      .catch((error) => {
        setUploadingErrorState(true);
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        clearTimeout(timer);
      });
  };

  return (
    <div className="container-content">
      <h5>Výroční zprávy</h5>
      <div>Poslední úprava: {formatDate(new Date(anualReport.issuedDate))}</div>
      <FlashMessage
        success={false}
        state={uploadingErrorState}
        text={messages.dataUpdateErr}
      />
      <FlashMessage
        success={false}
        state={loadinErrorState}
        text={messages.dataLoadErr}
      />
      {isLoading ? <Spinner animation="border" /> : null}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-2">
          <FormInput
            label={"Titulek"}
            name={"title"}
            value={anualReport.title}
            onChange={(e) =>
              setAnualReport({ ...anualReport, title: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="">Obsah</label>
          <MyEditor
            subject={anualReport}
            onChange={() =>
              setAnualReport({
                ...anualReport,
                content: editorRef.current.getContent(),
              })
            }
            editorRef={editorRef}
          />
        </div>
        <div>
          <button
            className="btn btn-success"
            type="submit"
            disabled={isSubmitted}
          >
            Uložit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnualReportForm;
