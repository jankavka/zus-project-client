import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPut } from "../../utils/api";
import formatDate from "../../components/formatDate";
import MyEditor from "../../components/MyEditor";
import FormInput from "../../components/FormInput";

const PersonalDataProtectionForm = () => {
  const [personalDataProtection, setPersonalDataProtection] = useState({
    title: "",
    content: "",
  });
  const editorRef = useRef();
  const navigation = useNavigate();

  useEffect(() => {
    apiGet("/api/static/personal-data-protection")
      .catch((error) => console.log(error))
      .then((data) => {
        setPersonalDataProtection(data);
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

    apiPut("/api/static/update/personal-data-protection", personalDataProtection)
      .catch((error) => console.log(error))
      .then(() => navigation("/admin/uredni-deska/ochrana-osobnich-udaju"));
  };

  return (
    <div className="container-content">
      <h1>Ochrana osobnách údajů</h1>
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
                    content: editorRef.current.getContent()
                })
            }}
        />
        <button className="btn btn-success mt-3" type="submit">Uložit</button>
      </form>
    </div>
  );
};

export default PersonalDataProtectionForm;
