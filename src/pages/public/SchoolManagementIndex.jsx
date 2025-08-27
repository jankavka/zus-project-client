import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../../utils/api";
import { Link, useLocation } from "react-router-dom";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const SchoolManagementIndex = ({ isEditable }) => {
  const location = useLocation();
  const [schoolManagement, setSchoolManagement] = useState([]);
  const [loadingErrorState, setLoadingErrorState] = useState(false);
  const [deleteSuccessState, setDeleteSuccessState] = useState(
    location.state?.deleteSuccessState || false
  );
  const [deleteErrorState, setDeleteErrorState] = useState(false);
  const { successCreateState } = location.state || false;
  const { successEditState } = location.state || false;

  useEffect(() => {
    apiGet("/api/school-management")
      .then((data) => setSchoolManagement(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  const handleDeleteMember = (id) => {
    let aprove = confirm("Opravdu chcete vymazat záznam");
    if (aprove) {
      apiDelete(`/api/school-management/${id}/delete`)
        .then(() => {
          setDeleteSuccessState(true);
          setSchoolManagement(schoolManagement.filter((item) => item.id != id));
        })
        .catch((error) => {
          setDeleteErrorState(true);
          console.error(error);
        });
    }
  };

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Vedení školy</h5>
      <FlashMessage
        success={true}
        state={deleteSuccessState}
        text={messages.dataDeleteOk}
      />
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
        success={false}
        state={deleteErrorState}
        text={messages.dataDeleteErr}
      />
      <FlashMessage
        success={false}
        state={loadingErrorState}
        text={messages.dataLoadErr}
      />
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
                {isEditable ? (
                  <Link to={`/admin/kontakty/vedeni-skoly/${member.id}`}>
                    {member.degree} {member.name}
                  </Link>
                ) : (
                  <Link to={`/kontakty/vedeni-skoly/${member.id}`}>
                    {member.degree} {member.name}
                  </Link>
                )}
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
