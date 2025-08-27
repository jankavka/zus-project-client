import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPut } from "../../utils/api";
import formatDate from "../../components/formatDate";
import MyEditor from "../../components/MyEditor";
import FormInput from "../../components/FormInput";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const PersonalDataProtectionForm = () => {
  const [personalDataProtection, setPersonalDataProtection] = useState({
    title: "",
    content: "",
  });
  const editorRef = useRef();
  const navigation = useNavigate();
  const [loadingErrorState, setLoadingErrorState] = useState(false);
  const [savingErrorState, setSavingErrorState] = useState(false);

  useEffect(() => {
    apiGet("/api/static/personal-data-protection")
      .then((data) => {
        setPersonalDataProtection(data);
      })
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  const handleInputChange = (e) => {
    setPersonalDataProtection({
      ...personalDataProtection,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    apiPut(
      "/api/static/update/personal-data-protection",
      personalDataProtection
    )
      .then(() =>
        navigation("/admin/uredni-deska/ochrana-osobnich-udaju", {
          state: { successState: true },
        })
      )
      .catch((error) => {
        setSavingErrorState(true);
        console.log(error);
      });
  };

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Ochrana osobnách údajů</h5>
      <FlashMessage
        success={false}
        state={savingErrorState}
        text={messages.dataUpdateErr}
      />
      <FlashMessage
        success={false}
        state={loadingErrorState}
        text={messages.dataLoadErr}
      />
      <p>
        Poslední aktualizace:{" "}
        {formatDate(new Date(personalDataProtection.issuedDate))}
      </p>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Titulek"}
          name={"title"}
          value={personalDataProtection.title}
          onChange={handleInputChange}
        />
        <MyEditor
          subject={personalDataProtection}
          editorRef={editorRef}
          onChange={() => {
            setPersonalDataProtection({
              ...personalDataProtection,
              content: editorRef.current.getContent(),
            });
          }}
        />
        <div className="d-flex justify-content-evenly">
          <button className="btn btn-success mt-3" type="submit">
            Uložit
          </button>
          <button
            className="btn btn-info mt-3"
            type="button"
            onClick={() => navigation(-1)}
          >
            Zpět
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDataProtectionForm;
