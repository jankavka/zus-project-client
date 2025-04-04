import React from "react";
import { API_URL } from "../../utils/api";
import { Link } from "react-router-dom";

const SchoolRulesIndex = () => {
    
    return (
        <div className="container-content">
            <h1>Školní řád</h1>
            <ul>
                <li><Link to={`${API_URL}/api/files/skolni-rad.pdf`} style={{color: "black"}}>KE STAŽENÍ ZDE</Link></li>
            </ul>
            
        </div>
    )
}

export default SchoolRulesIndex;