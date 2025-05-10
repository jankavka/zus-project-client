import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiDelete, apiGet, apiPost, apiPut } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const TeacherForm = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState({
    name: "",
    degree: "",
    email: "",
    telNumber: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      apiGet(`/api/teachers/${id}`).then((data) => setTeacher(data));
    }
  }, []);

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if(id){
    apiPut(`/api/teachers/${id}/edit`, teacher).then(() => navigate("/admin/kontakty/ucitele"))
    } else {
      apiPost("/api/teachers/create", teacher).then(() => navigate("/admin/kontakty/ucitele"))
    }
  }


  return (
    <div className="container-content">
      {id ? <h1>Upravit učitele</h1> : <h1>Nový učitel</h1>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Jméno</label>
          <input
            name="name"
            onChange={handleChange}
            value={teacher.name}
            className="form-control"
            type="text"
          />
        </div>
        <div>
          <label>Titul</label>
          <input
            name="degree"
            onChange={handleChange}
            value={teacher.degree}
            className="form-control"
            type="text"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            onChange={handleChange}
            value={teacher.email}
            className="form-control"
            type="text"
          />
        </div>
        <div className="mb-3">
          <label>Telefonní číslo</label>
          <input
            name="telNumber"
            onChange={handleChange}
            value={teacher.telNumber}
            className="form-control"
            type="text"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-success me-3">
            Uložit
          </button>
          <button type="button" className="btn btn-info" onClick={() => navigate(-1)}>
            Zpět
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherForm;
