import React from "react";
import { API_URL } from "../../utils/api";
import { Link } from "react-router-dom";

const SchoolRulesIndex = () => {
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
