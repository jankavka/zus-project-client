import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../../utils/api";
import { useNavigate, Link } from "react-router-dom";
import formatDate from "../../components/formatDate";
import { addInput, removeInput } from "../../components/InputManagement";

const BasicDataForm = () => {
  const [basicData, setBasicData] = useState({
    schoolName: "",
    address: "",
    legalForm: "",
    maxNumberOfStudents: "",
    founder: "",
    identificationNumber: "",
    organizationIdentificationMark: "",
    idNumber: "",
    dataBox: "",
    accountNumber: "",
  });
  const navigate = useNavigate();
  const [director, setDirector] = useState({});
  const [deputyDirector, setDeputyDirector] = useState({});
  const [fieldCounter, setFieldCounter] = useState(1);
  const [locationsOfEducation, setLocationsOfEducation] = useState([" "]);

  useEffect(() => {
    apiGet("/api/static/basic-data").then((data) => setBasicData(data));
    apiGet("/api/static/basic-data").then((data) =>
      setLocationsOfEducation(data.locationsOfEducation)
    );
    apiGet("/api/static/basic-data").then((data) =>
      setFieldCounter(
        data.locationsOfEducation.filter((item) => item !== " ").length
      )
    );
    apiGet("/api/school-management").then((data) =>
      setDirector(
        data.filter((member) => member.managementType === "director")[0]
      )
    );
    apiGet("/api/school-management").then((data) =>
      setDeputyDirector(
        data.filter((member) => member.managementType === "deputyDirector")[0]
      )
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      ...basicData,
      locationsOfEducation,
    };
    apiPost("/api/static/basic-data/create-or-edit", body).then(() =>
      navigate("/admin/o-skole/zakladni-udaje")
    );
  };

  useEffect(() => {
    console.log("locations in basic data: " + locationsOfEducation);
  }, [locationsOfEducation]);

  const onChange = (e) => {
    setBasicData({ ...basicData, [e.target.name]: e.target.value });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLocationsChange = (e, index) => {
    setLocationsOfEducation((prev) => {
      let newLocations = prev;
      newLocations[index] = e.target.value;
      return [...newLocations];
    });
  };

  return (
    <div>
      <h1>Základní údaje</h1>
      <p>Naposledy upraveno: {formatDate(new Date(basicData.issuedDate))}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Jméno školy</label>
          <input
            className="form-control"
            value={basicData.schoolName}
            name="schoolName"
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
            value={basicData.legalForm}
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
          <div>
            <button
              className="btn btn-info mb-3"
              type="button"
              onClick={() => addInput(fieldCounter, setFieldCounter, 5)}
            >
              Přidej pole
            </button>
            {Array.from(Array(fieldCounter).keys()).map((item, index) => {
              //console.log("index, item:" + index + " " + item);
              return (
                <div key={index}>
                  <input
                    className="form-control mb-3"
                    name={item}
                    type="text"
                    onChange={(e) => handleLocationsChange(e, index)}
                    value={locationsOfEducation[index] || " "}
                  />
                  {index === fieldCounter - 1 ? (
                    <button
                      onClick={() =>
                        removeInput(
                          index,
                          fieldCounter,
                          setFieldCounter,
                          setLocationsOfEducation
                        )
                      }
                      type="button"
                      className="btn btn-primary mb-3"
                    >
                      Odebrat pole
                    </button>
                  ) : null}
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
        <div></div>
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
            value={basicData.identificationNumber}
            name="identificationNumber"
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
        <div>
          <div className="d-flex text-center align-items-end">
            <h2 className="me-2">Vedení školy -</h2>
            <Link to={"/admin/kontakty/vedeni-skoly"}>
              <p>Detail</p>
            </Link>
          </div>
          <table className="table">
            <tbody>
              <tr>
                <td>Ředitel</td>
                <td>
                  <Link to={"/admin/kontakty/vedeni-skoly/" + director.id}>
                    {director.degree} {director.name}
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Zástupce ředitele</td>
                <td>
                  <Link
                    to={"/admin/kontakty/vedeni-skoly/" + deputyDirector.id}
                  >
                    {deputyDirector.degree} {deputyDirector.name}
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-success me-3">
            Uložit
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={handleGoBack}
          >
            Zpět
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicDataForm;
