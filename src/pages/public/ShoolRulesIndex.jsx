import React, { useEffect } from "react";
import { API_URL, apiGet } from "../../utils/api";
import { useLocation } from "react-router-dom";

const SchoolRulesIndex = () => {
  const location = useLocation();
  const section = location.pathname

  useEffect(() => {
    apiGet(`/api/files${section}`)
  })
  return (
    <div className="container-content">
      <h5 className="text-uppercase">Školní řád</h5>
      <ul>
        <li>
          <button
            className="btn btn-light"
            onClick={() =>
              window.open(`${API_URL}/api/files/skolni-rad.pdf`, "_blank")
            }
          >
            Otevřít
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SchoolRulesIndex;
