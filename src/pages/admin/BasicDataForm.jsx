import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const BasicDataForm = () => {
  const [basicData, setBasicData] = useState({
    schoolName: "",
    address: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    apiGet("/api/static/basic-data").then((data) => setBasicData(data));
    console.log(basicData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    apiPost("/api/static/basic-data/create-or-edit", basicData ).then(() =>
      navigate("/admin/o-skole/zakladni-udaje")
    );
  };

  const onChange = (e) => {
    setBasicData({...basicData, [e.target.name]: e.target.value})
  }

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Jméno školy</label>
          <input
            className="form-control"
            value={basicData.schoolName}
            name= "schoolName"
            // onChange={(e) =>
            //   setBasicData({ ...basicData, schoolName: e.target.value })
            // }
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <label>Adresa</label>
          <input
            className="form-control"
            value={basicData.address}
            name="address"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <label>Právní forma</label>
          <input
            className="form-control"
            name="legalForm"
            value={basicData.legaForm}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <label>Nejvyšší povolený počet žáků ve škole</label>
          <input
            className="form-control"
            value={basicData.maxNumberOfStudents}
            name="maxNumberOfStudents"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <label>Místa poskytovaného vzdělávání</label>
          <input
            className="form-control"
            value={basicData.locationsOfeducation}
            name="locationsOfEducation"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <label>Ředitel</label>
          <input
            className="form-control"
            name="director"
            value={basicData.director}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <label>Zástupce ředitele</label>
          <input
            className="form-control"
            type="text"
            value={basicData.deputyDirector}
            name="deputyDirector"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <label>Zřizovatel</label>
          <input
            className="form-control"
            type="text"
            value={basicData.founder}
            name="founder"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <label>IČO</label>
          <input
            className="form-control"
            type="text"
            value={basicData.taxIdentificationNumber}
            name="taxIdentificationNumber"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <label>IZO</label>
          <input
            className="form-control"
            type="text"
            value={basicData.organizationIdentificationMark}
            name="organizationIdentificationMark"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <label>REDIZO</label>
          <input
            className="form-control"
            type="text"
            value={basicData.idNumber}
            name="idNumber"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <label>Datová schránka</label>
          <input
            className="form-control"
            type="text"
            value={basicData.dataBox}
            name="dataBox"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <label>Bankovní spojení</label>
          <input
            className="form-control"
            type="text"
            value={basicData.accountNumber}
            name="accountNumber"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-success me-3">Uložit</button>
          <button className="btn btn-warning" onClick={handleGoBack}>Zpět</button>
        </div>
      </form>
    </div>
  );
};

export default BasicDataForm;
