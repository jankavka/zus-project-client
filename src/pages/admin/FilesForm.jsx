import { useRef } from "react";
import { useState } from "react";
import { API_URL } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const FilesForm = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState([]);
  const formData = new FormData();
  const navigate = useNavigate();
  const [errorState, setErrorState] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

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
      });
  };

  const handleFilesChange = (e) => {
    const filesToUpload = Array.from(e.target.files);
    setFile(filesToUpload[0]);
    setFileName(filesToUpload[0].name);
  };

  console.log(file, fileName);
  return (
    <div className="container-content">
      <h5>Nový Soubor</h5>
      <FlashMessage
        success={false}
        state={errorState}
        text={messages.fileCreateErr}
      />
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
          <input className="btn btn-success" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default FilesForm;
