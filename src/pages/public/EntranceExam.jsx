import { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";
import { Link } from "react-router-dom";

const EntranceExam = ({ isEditable }) => {
  const [entranceExam, setEntranceExam] = useState({});

  useEffect(() => {
    apiGet("/api/entrance-exam")
      .then((data) => setEntranceExam(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container-content">
      <h5 className="text-uppercase">Přijímací a talentové zkoušky</h5>
      {isEditable ? (
        <Link
          className="btn btn-success"
          to={"/admin/pro-rodice-a-zaky/prijimaci-zkousky/upravit"}
        >
          Upravit
        </Link>
      ) : null}
      <p dangerouslySetInnerHTML={{__html: entranceExam.content}}></p>
    </div>
  );
};
export default EntranceExam;
