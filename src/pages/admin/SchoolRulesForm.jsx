import { useEffect, useState } from "react";
import { apiGet, apiPut } from "../../utils/api";
import FormInput from "../../components/FormInput";
import { useNavigate, Link } from "react-router-dom";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";
import { getSchoolRulesPdfUrl } from "../../utils/schoolRules";

const SchoolRulesForm = () => {
  const [schoolRules, setSchoolRules] = useState({
    title: "",
    content: "",
    issuedDate: "",
  });
  const [url, setUrl] = useState("");
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loadingErrorState, setLoadingErrorState] = useState(false);
  const navigate = useNavigate();
  const [uploadingErrorState, setUploadingErrorState] = useState(false);

  useEffect(() => {
    apiGet("/api/static/school-rules")
      .then((data) => {
        setSchoolRules(data);
        setUrl(getSchoolRulesPdfUrl(data?.content));
      })
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
    apiGet("/api/files")
      .then((data) =>
        setPdfFiles(
          (data || []).filter((file) => /\.pdf$/i.test(file.url || ""))
        )
      )
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploadingErrorState(false);
    // The PDF URL is stored in the `content` field of the static entry.
    apiPut("/api/static/update/school-rules", {
      ...schoolRules,
      content: url.trim(),
    })
      .then(() =>
        navigate("/admin/uredni-deska/skolni-rad", {
          state: { successState: true },
        })
      )
      .catch((error) => {
        setUploadingErrorState(true);
        console.error(error);
      });
  };

  const selectedFile = pdfFiles.find((file) => file.url === url.trim());

  return (
    <div className="container-content">
      <h5>Školní řád</h5>
      <p>
        Položka „Školní řád" v menu Úřední deska otevře v novém okně PDF
        nastavené níže. Prázdný odkaz položku v menu skryje. Nový PDF soubor
        nejdříve nahrajte v sekci <Link to="/admin/galerie/soubory">Galerie → Soubory</Link>.
      </p>
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
          <label htmlFor="schoolRulesFile">Nahraný PDF soubor</label>
          <select
            id="schoolRulesFile"
            className="form-select mb-2"
            value={selectedFile ? selectedFile.url : ""}
            onChange={(e) => e.target.value && setUrl(e.target.value)}
          >
            <option value="">— vyberte soubor —</option>
            {pdfFiles.map((file) => (
              <option key={file.id} value={file.url}>
                {file.fileName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <FormInput
            label={"Odkaz na PDF (URL)"}
            name={"schoolRulesUrl"}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <button className="btn btn-success me-3" type="submit">
            Uložit
          </button>
          {url.trim() ? (
            <a href={url.trim()} target="_blank" rel="noopener noreferrer">
              Otevřít PDF
            </a>
          ) : (
            <span className="text-muted">Položka je v menu skrytá</span>
          )}
        </div>
      </form>
    </div>
  );
};
export default SchoolRulesForm;
