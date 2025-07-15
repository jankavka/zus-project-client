import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../../utils/api";
import { Link } from "react-router-dom";

const SchoolManagementIndex = ({ isEditable }) => {
  const [schoolManagement, setSchoolManagement] = useState([]);
  const [succesState, setScuccessState] = useState();

  useEffect(() => {
    apiGet("/api/school-management").then((data) => setSchoolManagement(data));
    if (schoolManagement.length !== 0) {
      console.log(schoolManagement);
    }
  }, []);

  const handleDeleteMember = (id) => {
    let aprove = confirm("Opravdu chcete vymazat záznam");
    if (aprove) {
      apiDelete(`/api/school-management/${id}/delete`)
        .then(() => setScuccessState(true))
        .catch((error) => console.log(error));
    }
    setSchoolManagement(schoolManagement.filter((item) => item.id != id));
  };

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Vedení školy</h5>
      {succesState ? (
        <div className="alert alert-success">Záznam byl úspěšně vymazán</div>
      ) : null}
      {isEditable ? (
        <Link
          to={"/admin/kontakty/vedeni-skoly/novy"}
          className="btn btn-success mb-3"
        >
          Nový záznam
        </Link>
      ) : null}
      <table className="table">
        <thead>
          <tr>
            <th>Jméno</th>
            <th>Kontakt</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {schoolManagement.map((member, index) => (
            <tr key={index}>
              <td>
                <Link to={`/kontakty/vedeni-skoly/${member.id}`}>{member.degree} {member.name}</Link>
              </td>
              <td>
                <span>{member.telNumber}</span>
                <br />
                <span>{member.email}</span>
                <br />
                <span>
                  {member.managementType === "director"
                    ? "ředitel"
                    : "zástupce ředitele"}
                </span>
              </td>
              <td>
                {isEditable ? (
                  <div>
                    <Link
                      className="btn btn-warning me-3"
                      to={`/admin/kontakty/vedeni-skoly/${member.id}/upravit`}
                    >
                      Upravit
                    </Link>

                    <button
                      onClick={() => handleDeleteMember(member.id)}
                      className="btn btn-danger"
                    >
                      Vymazat
                    </button>
                  </div>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchoolManagementIndex;
