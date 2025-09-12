import { useEffect, useRef } from "react";
import { useState } from "react";
import { API_URL } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";
import { Spinner } from "react-bootstrap";

const FilesForm = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState([]);
  const formData = new FormData();
  const navigate = useNavigate();
  const [errorState, setErrorState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    if (timerId === null) return;

    return () => clearTimeout(timerId);
  }, [timerId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isSubmitted) return;
    setIsSubmitted(true);
    const timer = setTimeout(() => setIsSubmitted(false), 3000);
    setTimerId(timer);

    formData.append("file", file);
    formData.append("fileName", fileName);

    fetch(`${API_URL}/api/files`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          navigate("/admin/galerie/soubory", { state: { successState: true } });
        } else {
          setErrorState(true);
        }
      })
      .catch((error) => {
        setErrorState(true);
        console.error("Error: " + error);
      })
      .finally(() => {
        clearTimeout(timer);
        setIsLoading(false);
      });
  };

  const handleFilesChange = (e) => {
    const filesToUpload = Array.from(e.target.files);
    setFile(filesToUpload[0]);
    setFileName(filesToUpload[0].name);
  };

  return (
    <div className="container-content">
      <h5>Nový Soubor</h5>
      <FlashMessage
        success={false}
        state={errorState}
        text={messages.fileCreateErr}
      />
      {isLoading ? <Spinner animation="border" /> : null}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <input
            className="form-control"
            type="file"
            accept=".pdf"
            ref={fileInputRef}
            onChange={(e) => handleFilesChange(e)}
          />
        </div>
        <div>
          <input
            className="btn btn-success"
            type="submit"
            disabled={isSubmitted}
          />
        </div>
      </form>
    </div>
  );
};

export default FilesForm;
