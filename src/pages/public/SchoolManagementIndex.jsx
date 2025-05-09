import React, { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";
import { Link } from "react-router-dom";

const SchoolManagementIndex = ({ isEditable }) => {
  const [schoolManagement, setSchoolManagement] = useState([]);

  useEffect(() => {
    apiGet("/api/school-management").then((data) => setSchoolManagement(data));
    //console.log(schoolManagement);
  }, []);

  return (
    <div className="container-content">
      <h1>Vedení školy</h1>
      {isEditable ? <Link to={"/admin/kontakty/vedeni-skoly/novy"} className="btn btn-success mb-3">Nový záznam</Link> : null}
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
                {member.degree} {member.name}
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
                <Link className="btn btn-warning" to={`/admin/kontakty/vedeni-skoly/${member.id}/upravit`}>Upravit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchoolManagementIndex;
