import { useState, useEffect, useRef } from "react";
import { apiGet, apiPost, apiPut } from "../../utils/api";
import FormInput from "../../components/FormInput";
import { useNavigate, useParams } from "react-router-dom";
import MyEditor from "../../components/MyEditor";

const SchoolAchievementForm = () => {
  const [schoolAchievement, setSchoolAchievement] = useState({
    title: "",
    content: "",
    schoolYear: {id: ""},
  });
  const [schoolYears, setSchoolYears] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const editorRef = useRef();

  const [counter, setCounter] = useState(1);

  useEffect(() => {
    if (id) {
      apiGet(`/api/school-achievements/${id}`).then((data) =>
        setSchoolAchievement(data)
      );
      apiGet("/api/school-year")
        .catch((error) => console.log(error))
        .then((data) => setSchoolYears(data));
    } else {
      apiGet("/api/school-year")
        .catch((error) => console.log(error))
        .then((data) => setSchoolYears(data));
    }
  }, []);

  const handleSelection = (e) => {
    setSchoolAchievement((prev) => {
      let value = e.target.value;
      console.log(value);
      return {
        ...prev,
        schoolYear: {id: value},
      };
    });
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    if (id) {
      apiPut(`/api/school-achievements/edit/${id}`, schoolAchievement)
        .catch((error) => console.log(error))
        .then(() => navigate("/admin/o-skole/uspechy-skoly"));
    } else {
      apiPost("/api/school-achievements/create", schoolAchievement)
        .catch((error) => console.log(error))
        .then(() => navigate("/admin/o-skole/uspechy-skoly"));
    }
  };

  useEffect(() => {
    console.log(schoolAchievement);
    console.log(schoolYears)
  }, [schoolAchievement]);

  return (
    <div className="container-content">
      <h1>Úspěchy školy</h1>
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
