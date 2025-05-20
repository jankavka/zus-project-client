import React, { useEffect, useState } from "react";
import { apiGet, apiDelete } from "../../utils/api";
import { Link } from "react-router-dom";

const TeachersIndex = ({ isEditable }) => {
  const [teachers, setTeachers] = useState([]);

  const deleteTeacher = (id) => {
    let aprove = confirm("Opravdu chcete vymazat záznam?");
    if (aprove) {
      apiDelete(`/api/teachers/${id}/delete`).then(() =>
        setTeachers(teachers.filter((item) => item.id !== id))
      );
    }
  };

  useEffect(() => {
    apiGet("/api/teachers").then((data) => setTeachers(data));
  }, []);

  return (
    <div className="container-content">
      <h1>Učitelé</h1>
      {isEditable ? (
        <Link
          className="btn btn-success mb-3"
          to="/admin/kontakty/ucitele/novy"
        >
          Přidat učitele
        </Link>
      ) : null}
      <div>
        <table className="table table-responsive">
          <thead>
            <tr>
              <th>Jméno</th>
              <th>Kontakt</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr key={index}>
                <td>
                  {teacher.degree} {teacher.name}
                </td>
                <td>
                  <span>{teacher.email}</span>
                  <br />
                  <span> {teacher.telNumber}</span>
                </td>
                <td>
                  {isEditable ? (
                    <div>
                      <Link
                        to={`/admin/kontakty/ucitele/${teacher.id}/upravit`}
                        className="btn btn-warning me-3"
                      >
                        Upravit
                      </Link>
                      <button
                        onClick={() => deleteTeacher(teacher.id)}
                        className="btn btn-danger"
                      >
                        Vymazat
                      </button>{" "}
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeachersIndex;
