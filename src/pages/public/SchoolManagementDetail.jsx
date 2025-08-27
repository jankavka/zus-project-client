import { useEffect, useState } from "react";
import { apiGet, apiDelete } from "../../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const SchoolManagementDeatil = ({ isEditable }) => {
  const [managementMember, setManagementMember] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [loadingErrorState, setLoadingErrorState] = useState(false);
  const [deleteErrorState, setDeleteErrorState] = useState(false);

  useEffect(() => {
    apiGet("/api/school-management/" + id)
      .then((data) => setManagementMember(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  const handleDeleteMember = (id) => {
    let aprove = confirm("Opravdu chcete vymazat záznam");
    if (aprove) {
      apiDelete(`/api/school-management/${id}/delete`)
        .then(() =>
          navigate("/admin/kontakty/vedeni-skoly", {
            state: { deleteSuccessState: true },
          })
        )
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
        success={false}
        state={deleteErrorState}
        text={messages.dataDeleteErr}
      />
      <FlashMessage
        success={false}
        state={loadingErrorState}
        text={messages.dataLoadErr}
      />
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
            <td>
              {managementMember.managementType === "director"
                ? "ředitel"
                : "zástupce ředitele"}
            </td>
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
            onClick={() => handleDeleteMember(id)}
          >
            Vymazat
          </button>
        </div>
      ) : null}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-info"
        type="button"
      >
        {" "}
        Zpět
      </button>
    </div>
  );
};

export default SchoolManagementDeatil;
