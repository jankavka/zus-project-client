import { useEffect, useState, useRef } from "react";
import FormInput from "../../components/FormInput";
import MyEditor from "../../components/MyEditor";
import { apiGet, apiPut } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const SchoolEducationProgramForm = () => {
  const [schoolEducationProgram, setSchoolEducationProgram] = useState({
    title: "",
    content: "",
    issuedDate: "",
  });
  const editorRef = useRef();
  const [loadingErrorState, setLoadingErrorState] = useState(false);
  const navigate = useNavigate();
  const [uploadingErrorState, setUploadingErrorState] = useState(false);

  useEffect(() => {
    apiGet("/api/static/school-education-program")
      .then((data) => setSchoolEducationProgram(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    apiPut("/api/static/update/school-education-program",schoolEducationProgram)
      .then(() =>
        navigate("/admin/uredni-deska/skolni-vzdelavaci-program", {
          state: { successState: true },
        })
      )
      .catch((error) => {
        setUploadingErrorState(true);
        console.error(error);
      });
  };

  return (
    <div className="container-content">
      <h5 className="text-uppercase">školní vzdělávací program</h5>
      <FlashMessage
        success={false}
        state={uploadingErrorState}
        text={messages.dataUpdateErr}
      />
      <FlashMessage
        success={false}
        state={loadingErrorState}
        text={messages.dataLoadErr}
      />
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormInput
          label={"Titulek:"}
          name={"title"}
          value={schoolEducationProgram?.title || " "}
          onChange={(e) =>
            setSchoolEducationProgram({
              ...schoolEducationProgram,
              title: e.target.value,
            })
          }
        />
        <div className="mb-3">
          <label>Obsah:</label>
          <MyEditor
            subject={schoolEducationProgram}
            editorRef={editorRef}
            onChange={() =>
              setSchoolEducationProgram({
                ...schoolEducationProgram,
                content: editorRef.current.getContent(),
              })
            }
          />
        </div>
        <div>
          <button className="btn btn-success" type="submit">
            Uložit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SchoolEducationProgramForm;
