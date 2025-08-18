import { useState, useEffect } from "react";
import { apiGet } from "../../utils/api";
import { Link } from "react-router-dom";

const SchoolSupportIndex = ({ isEditable }) => {
  const [schoolSupport, setSchoolSupport] = useState({});

  useEffect(() => {
    apiGet("/api/static/school-support").then((data) => setSchoolSupport(data));
  }, []);

  return (
    <div className="container-content">
      <h5 className="text-uppercase mb-3">podpora školy</h5>
      <div dangerouslySetInnerHTML={{ __html: schoolSupport.content }}></div>
      {isEditable ? (
        <Link className="btn btn-success" to={"/admin/podpora-skoly/upravit"}>
          Upravit
        </Link>
      ) : null}
    </div>
  );
};

export default SchoolSupportIndex;
