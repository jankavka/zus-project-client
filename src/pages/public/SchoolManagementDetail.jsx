import { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";
import { useParams, useNavigate, } from "react-router-dom";
import { Link } from "react-router-dom";

const SchoolManagementDeatil = ({ isEditable }) => {
  const [managementMember, setManagementMember] = useState({});
  const { id } = useParams();
  const navigate = useNavigate(-1);

  useEffect(() => {
    apiGet("/api/school-management/" + id).then((data) =>
      setManagementMember(data)
    );
  }, []);

  const handleDeleteMember = (id) => {
    let aprove = confirm("Opravdu chcete vymazat záznam");
    if (aprove) {
      apiDelete(`/api/school-management/${id}/delete`)
        .then(() => {
          isEditable
            ? navigate("/admin/kontatky/vedeni-skoly")
            : navigate("/kontaky/vedeni-skoly");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Vedení školy</h5>
      <table className="table">
        <tbody>
          <tr>
            <td>Jméno</td>
            <td>
              {managementMember.degree} {managementMember.name}
            </td>
          </tr>
          <tr>
            <td>Pozice</td>
            <td>{managementMember.managementType === "director" ? "ředitel" : "zástupce ředitele"}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{managementMember.email}</td>
          </tr>
          <tr>
            <td>Telefon</td>
            <td>{managementMember.telNumber}</td>
          </tr>
        </tbody>
      </table>
      {isEditable ? (
        <div className="mb-3">
          <Link
            className="btn btn-warning me-3"
            to={`/kontakty/vedeni-skoly/${id}/upravit`}
          >
            Upravit
          </Link>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleDeleteMember}
          >
            Vymazat
          </button>
        </div>
      ) : null}
      <button onClick={() => navigate(-1)} className="btn btn-info" type="button">
        {" "}
        Zpět
      </button>
    </div>
  );
};

export default SchoolManagementDeatil;
