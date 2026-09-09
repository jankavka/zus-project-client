import { useEffect, useState } from "react";
import { apiGet, apiPut } from "../../utils/api";
import FormInput from "../../components/FormInput";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const SchoolYearLinkForm = () => {
  const [url, setUrl] = useState("");
  const [loadErrorState, setLoadErrorState] = useState(false);
  const [saveErrorState, setSaveErrorState] = useState(false);
  const [successState, setSuccessState] = useState(false);

  useEffect(() => {
    apiGet("/api/school-year-link")
      .then((data) => setUrl(data?.url || ""))
      .catch((error) => {
        setLoadErrorState(true);
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessState(false);
    setSaveErrorState(false);
    apiPut("/api/school-year-link", { url: url.trim() })
      .then((data) => {
        setUrl(data?.url || "");
        setSuccessState(true);
      })
      .catch((error) => {
        setSaveErrorState(true);
        console.error(error);
      });
  };

  return (
    <div className="container-content">
      <h5 className="text-uppercase mb-3">Organizace školního roku</h5>
      <p>
        Odkaz, který se otevře v novém okně po kliknutí na položku „Organizace
        školního roku" v menu Úřední deska. Prázdný odkaz položku v menu skryje.
      </p>
      <FlashMessage
        success={false}
        state={loadErrorState}
        text={messages.dataLoadErr}
      />
      <FlashMessage
        success={false}
        state={saveErrorState}
        text={messages.dataUpdateErr}
      />
      <FlashMessage
        success={true}
        state={successState}
        text={messages.dataUpdateOk}
      />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <FormInput
            label="Odkaz (URL)"
            name="schoolYearLink"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="d-flex align-items-center">
          <button className="btn btn-success me-3" type="submit">
            Uložit
          </button>
          {url.trim() ? (
            <a href={url.trim()} target="_blank" rel="noopener noreferrer">
              Otevřít odkaz
            </a>
          ) : (
            <span className="text-muted">Položka je v menu skrytá</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default SchoolYearLinkForm;
