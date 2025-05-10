import { useNavigate, useParams } from "react-router-dom";
import ManagementType from "./ManagementType";
import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut } from "../../utils/api";

const SchoolManagementForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [schoolManagement, setSchoolManagement] = useState({
    name: "",
    degree: "",
    telNumber: "",
    email: "",
    managementType: "",
  });

  const [error, setError] = useState();
  const handleChange = (e) => {
    setSchoolManagement({
      ...schoolManagement,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (id) {
      apiGet(`/api/school-management/${id}`).then((data) =>
        setSchoolManagement(data)
      );
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      apiPut(`/api/school-managament/${id}/edit`, schoolManagement)
        .then(() => navigate("/admin/kontakty/vedeni-skoly"))
        .catch((error) => {
          console.log(error.message);
          setError({ message: "prosím vyplňte všechna pole" });
        });
    } else {
      apiPost("/api/school-management/create", schoolManagement)
        .then(() => navigate("/admin/kontakty/vedeni-skoly"))
        .catch((error) => {
          console.log(error.message);
          setError({ message: "Prosím vyplňte všechna pole" });
        });
      console.log(schoolManagement);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleInputSelectChange = (e) => {
    let value = Array.from(e.target.selectedOptions, (item) => item.value);
    setSchoolManagement({ ...schoolManagement, managementType: value[0] });
  };

  return (
    <div className="container-content">
      {error ? <div className="alert alert-danger">{error.message}</div> : null}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Jméno</label>
          <input
            required
            onChange={handleChange}
            name="name"
            className="form-control"
            type="text"
            value={schoolManagement.name}
          />
        </div>
        <div>
          <label>Titul</label>
          <input
            required
            onChange={handleChange}
            name="degree"
            className="form-control"
            type="text"
            value={schoolManagement.degree}
          />
        </div>
        <div>
          <label>Telefonní číslo</label>
          <input
            required
            onChange={handleChange}
            name="telNumber"
            className="form-control"
            type="text"
            value={schoolManagement.telNumber}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            required={true}
            onChange={handleChange}
            name="email"
            className="form-control"
            type="text"
            value={schoolManagement.email}
          />
        </div>
        <div className="mb-3">
          <label>Pozice</label>
          <select
            required={true}
            onChange={handleInputSelectChange}
            name="managementType"
            value={schoolManagement.managementType}
            className="form-select"
            multiple={false}
          >
            <option disabled selected value="">
              vyberte pozici
            </option>
            <option value={"director"}>{ManagementType["director"]}</option>
            <option value={"deputyDirector"}>
              {ManagementType["deputyDirector"]}
            </option>
          </select>
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="btn btn-success me-3"
            type="submit"
          >
            Uložit
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => navigate(-1)}
          >
            Zpět
          </button>
        </div>
      </form>
    </div>
  );
};

export default SchoolManagementForm;
