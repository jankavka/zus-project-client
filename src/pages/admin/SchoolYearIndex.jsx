import { useEffect, useState } from "react";
import { apiDelete, apiGet, apiPost } from "../../utils/api";
import FormInput from "../../components/FormInput";
import { useNavigate } from "react-router-dom";
import LoadingText from "../../components/LoadingText";

const SchoolYearIndex = () => {
  const [schoolYears, setSchoolYears] = useState([]);
  const [newSchoolYear, setNewSchoolYear] = useState({
    schoolYear: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    apiGet("/api/school-year")
      .catch((error) => console.log(error))
      .then((data) => setSchoolYears(data));
  }, []);

  const handleChange = (e) => {
    setNewSchoolYear({
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = (id) => {
    const aprove = confirm("Opravdu chcete vymazat tento školní rok?");
    if (aprove) {
      apiDelete(`/api/school-year/${id}`).then(() =>
        navigate("/admin/o-skole/uspechy-skoly/skolni-roky")
      );
      setSchoolYears(schoolYears.filter((year) => year.id != id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiPost("/api/school-year/create", newSchoolYear).then(() =>
      navigate("/admin/o-skole/uspechy-skoly/skolni-roky")
    );
    setSchoolYears((prev) => [...prev, newSchoolYear]);
    setNewSchoolYear(" ");
  };

  return (
    <div className="container-content">
      <h1>Školní roky</h1>
      <table className="table">
        <tbody>
          {schoolYears ? schoolYears.map((year, index) => (
            <tr key={index}>
              <td className="text-center" >{year.schoolYear}</td>
              <td className="text-center">
                <button
                  className="btn btn-danger ms-3"
                  type="button"
                  onClick={() => handleDelete(year.id)}
                >
                  Delete
                </button>{" "}
              </td>
            </tr>
          )): <tr><td><LoadingText/></td></tr>}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Přidat školní rok"}
          name="schoolYear"
          value={newSchoolYear.schoolYear || " "}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-success me-3">
          Přidej
        </button>
        <button className="btn btn-info" type="button" onClick={() => navigate(-1)}>Zpět</button>
      </form>
    </div>
  );
};

export default SchoolYearIndex;
