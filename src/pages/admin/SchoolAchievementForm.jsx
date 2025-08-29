import { useState, useEffect, useRef } from "react";
import { apiGet, apiPost, apiPut } from "../../utils/api";
import FormInput from "../../components/FormInput";
import { useNavigate, useParams } from "react-router-dom";
import MyEditor from "../../components/MyEditor";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const SchoolAchievementForm = () => {
  const [schoolAchievement, setSchoolAchievement] = useState({
    title: "",
    content: "",
    schoolYear: { id: "" },
  });
  const [schoolYears, setSchoolYears] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const editorRef = useRef();
  //const [counter, setCounter] = useState(1);
  const [loadingErrorState, setLoadingErrorState] = useState(false);
  const [uploadingErrorState, setUploadingErrorState] = useState(false);
  const [creatingErrorState, setCreatingErrorState] = useState(false);

  useEffect(() => {
    if (id) {
      apiGet(`/api/school-achievements/${id}`)
        .then((data) => setSchoolAchievement(data))
        .catch((error) => {
          setLoadingErrorState(true);
          console.error(error);
        });
      apiGet("/api/school-year")
        .then((data) => setSchoolYears(data))
        .catch((error) => {
          setLoadingErrorState(true);
          console.error(error);
        });
    } else {
      apiGet("/api/school-year")
        .then((data) => setSchoolYears(data))
        .catch((error) => {
          setLoadingErrorState(true);
          console.error(error);
        });
    }
  }, []);

  const handleSelection = (e) => {
    setSchoolAchievement((prev) => {
      let value = e.target.value;
      return {
        ...prev,
        schoolYear: { id: value },
      };
    });
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    if (id) {
      apiPut(`/api/school-achievements/edit/${id}`, schoolAchievement)
        .then(() =>
          navigate("/admin/o-skole/uspechy-skoly", {
            state: { successState: true },
          })
        )
        .catch((error) => {
          setUploadingErrorState(true);
          console.error(error);
        });
    } else {
      apiPost("/api/school-achievements/create", schoolAchievement)
        .then(() =>
          navigate("/admin/o-skole/uspechy-skoly", {
            state: { successState: true },
          })
        )
        .catch((error) => {
          setCreatingErrorState(true);
          console.error(error);
        });
    }
  };

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Úspěchy školy</h5>
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
      <FlashMessage
        success={false}
        state={creatingErrorState}
        text={messages.dataCreateErr}
      />
      <form onSubmit={(e) => handleSubmit(e, id)}>
        <div>
          <FormInput
            label={"Titulek"}
            name="title"
            value={schoolAchievement.title}
            onChange={(e) =>
              setSchoolAchievement((prev) => {
                return {
                  ...prev,
                  title: e.target.value,
                };
              })
            }
          />
        </div>
        <div>
          <label>Popis</label>
          <MyEditor
            subject={schoolAchievement}
            editorRef={editorRef}
            onChange={() => {
              setSchoolAchievement((prev) => {
                return {
                  ...prev,
                  content: editorRef.current.getContent(),
                };
              });
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="select">Rok:</label>
          <select
            className="form-control"
            name="schoolYears"
            id="select"
            value={schoolAchievement.schoolYear.id}
            onChange={handleSelection}
          >
            <option value={""} disabled>
              Vyberte možnost
            </option>
            {schoolYears &&
              schoolYears.map((year, index) => (
                <option key={index} value={year.id}>
                  {year.schoolYear}
                </option>
              ))}
          </select>
        </div>
        <div>
          <button className="btn btn-success me-3">Uložit</button>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => navigate(-1)}
          >
            Zpět
          </button>
        </div>
      </form>
    </div>
  );
};

export default SchoolAchievementForm;
