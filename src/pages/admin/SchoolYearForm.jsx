import { useEffect, useState } from "react";
import { apiDelete, apiGet, apiPost } from "../../utils/api";
import FormInput from "../../components/FormInput";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingText from "../../components/LoadingText";
import FlashMessage from "../../components/FlashMessage";
import { messages } from "../../components/FlashMessageTexts";

const SchoolYearForm = () => {
  const [schoolYears, setSchoolYears] = useState([]);
  const [newSchoolYear, setNewSchoolYear] = useState({
    schoolYear: "",
  });
  const navigate = useNavigate();
  const [loadingErrorState, setLoadingErrorState] = useState(false);
  const [uploadingErrorState, setUploadingErrorState] = useState(false);
  const location = useLocation();
  const { deleteSuccessState } = location.state || false;
  const { successState } = location.state || false;
  const [deleteErrorState, setDeleteErrorState] = useState(false);

  useEffect(() => {
    apiGet("/api/school-year")
      .then((data) => setSchoolYears(data))
      .catch((error) => {
        setLoadingErrorState(true);
        console.error(error);
      });
  }, []);

  const handleChange = (e) => {
    setNewSchoolYear({
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = (id) => {
    const aprove = confirm("Opravdu chcete vymazat tento školní rok?");
    if (aprove) {
      apiDelete(`/api/school-year/${id}`)
        .then(() => {
          //ssetSchoolYears(schoolYears.filter((year) => year.id != id));
          navigate("/admin/o-skole/uspechy-skoly/skolni-roky", {
            state: { deleteSuccessState: true },
          });
        })
        .catch((error) => {
          setDeleteErrorState(true);
          console.error(error);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiPost("/api/school-year/create", newSchoolYear)
      .then(() =>
        navigate("/admin/o-skole/uspechy-skoly/skolni-roky", {
          state: { successState: true },
        })
      )
      .catch((error) => {
        setUploadingErrorState(true);
        console.error(error);
      });
    setSchoolYears((prev) => [...prev, newSchoolYear]);
    setNewSchoolYear(" ");
  };

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Školní roky</h5>
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
        state={uploadingErrorState}
        text={messages.dataUpdateErr}
      />
      <FlashMessage
        success={false}
        state={loadingErrorState}
        text={messages.dataLoadErr}
      />
      <FlashMessage
        success={true}
        state={successState}
        text={messages.dataCreateOk}
      />
      <table className="table">
        <tbody>
          {schoolYears ? (
            schoolYears.map((year, index) => (
              <tr key={index}>
                <td className="text-center">{year.schoolYear}</td>
                <td className="text-center">
                  <button
                    className="btn btn-danger ms-3"
                    type="button"
                    onClick={() => handleDelete(year.id)}
                  >
                    Delete
                  </button>{" "}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                <LoadingText />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Přidat školní rok"}
          name="schoolYear"
          value={newSchoolYear.schoolYear || " "}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-success me-3">
          Přidej
        </button>
        <button
          className="btn btn-info"
          type="button"
          onClick={() => navigate(-1)}
        >
          Zpět
        </button>
      </form>
    </div>
  );
};

export default SchoolYearForm;
