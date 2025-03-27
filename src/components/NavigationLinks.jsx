import React from "react";
import { Link } from "react-router-dom";

const NavigationLinks = () => {

    return(
    <nav className="navbar navbar-expand-sm nav-bg">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navigace"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navigace">
            <div className="container-fluid">
              <ul className="navbar-nav navbar-container justify-content-between">
                <li className="nav-item">
                  <Link
                    className="nav-link nav-text text-uppercase"
                    to={"/o-skole"}
                  >
                    o škole
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link nav-text text-uppercase"
                    to={"/pro-rodice-a-zaky"}
                  >
                    pro rodiče a žáky
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link nav-text text-uppercase"
                    to={"/galerie"}
                  >
                    galerie
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link nav-text text-uppercase"
                    to={"/uredni-deska"}
                  >
                    úřední deska
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link nav-text text-uppercase"
                    to={"/kontakty"}
                  >
                    kontakty
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link search-icon" to={"/search"}></Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    )
}

export default NavigationLinks;