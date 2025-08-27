import React, { useEffect, useState } from "react";
import { apiGet, apiDelete } from "../../utils/api";
import { Link, useLocation } from "react-router-dom";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const TeachersIndex = ({ isEditable }) => {
  const [teachers, setTeachers] = useState([]);
  const location = useLocation();
  const { successEditState } = location.state || false;
  const { successCreateState } = location.state || false;
  const [loadingErrorState, setLoadingErrorState] = useState(false);
  const [deleteSuccessState, setDeleteSuccessState] = useState(false);
  const [deleteErrorState, setDeleteErrorState] = useState(false);

  const deleteTeacher = (id) => {
    let aprove = confirm("Opravdu chcete vymazat záznam?");
    if (aprove) {
      apiDelete(`/api/teachers/${id}/delete`)
        .then(() => setTeachers(teachers.filter((item) => item.id !== id)))
        .catch((error) => {
          setDeleteErrorState(true);
          console.error(error);
        });
    }
  };

  useEffect(() => {
    apiGet("/api/teachers")
      .then((data) => setTeachers(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Učitelé</h5>
      <FlashMessage
        success={true}
        state={successCreateState}
        text={messages.dataCreateOk}
      />
      <FlashMessage
        success={true}
        state={successEditState}
        text={messages.dataUpdateOk}
      />
      <FlashMessage
        success={true}
        state={deleteSuccessState}
        text={messages.dataDeleteOk}
      />
      <FlashMessage
        success={false}
        state={deleteErrorState}
        text={messages.dataDeleteErr}
      />
      <FlashMessage
        success={false}
        stae={loadingErrorState}
        text={messages.dataLoadErr}
      />
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
