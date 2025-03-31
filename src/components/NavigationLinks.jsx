import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "bootstrap";

const NavigationLinks = () => {

  //Nefunguje dodělat
  useEffect(() => {
    const dropdowns = document.querySelectorAll(".dropdown");

    const toggleDropdown = (event) => {
      event.stopPropagation();
      const dropdownInstance = Dropdown.getOrCreateInstance(
        event.currentTarget
      );
      if(window.innerWidth < 600){
      dropdownInstance.toggle();
      }
      
    };

    const closeDropdownOnOutsideClick = (event) => {
      event.preventDefault();
      dropdowns.forEach((dropdown) => {
        if (!dropdown.contains(event.target)) {
          const dropdownInstance = Dropdown.getOrCreateInstance(dropdown);
          dropdownInstance.hide();
        }
      });
    };

    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("click", toggleDropdown);
    })

    document.addEventListener("click", closeDropdownOnOutsideClick);

    return () => {
      dropdowns.forEach((dropdown) => {
        dropdown.removeEventListener("click", toggleDropdown);
      })

      document.removeEventListener("click", closeDropdownOnOutsideClick)
    }
  


  }, []);

  return (
    <div className="nav-position-fixed">
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
                <div className="dropdown">
                  <button
                    className="nav-link nav-text text-uppercase"
                    type="button"
                  >
                    o škole
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item text-dropdown"
                        to={"/o-skole/zakladni-udaje"}
                      >
                        Základní údaje
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-dropdown"
                        to={"/o-skole/historie-a-soucasnost"}
                      >
                        Historie a současnost
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-dropdown"
                        to={"/o-skole/studijni-zamereni"}
                      >
                        Studijnín zmameření
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-dropdown"
                        to={"/o-skole/uspechy-skoly"}
                      >
                        Úspěchy školy
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <div className="dropdown">
                  <button
                    className="nav-link nav-text text-uppercase"
                    type="button"
                  >
                    pro rodiče a žáky
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item text-dropdown"
                        to={"/pro-rodice-a-zaky/ochrana-osobnich-udaju"}
                      >
                        Rozvrh kolektivní výuk
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-dropdown"
                        to={"/pro-rodice-a-zaky/hudebni-nauka"}
                      >
                        Hudební nauka
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-dropdown"
                        to={"/pro-rodice-a-zaky/skolne"}
                      >
                        Školné
                      </Link>
                    </li>
                    <li>
                      <a
                        className="dropdown-item text-dropdown"
                        href="https://klasifikace.jphsw.cz/application/default?hash=7e7757b1e12abcb736ab9a754ffb617a"
                      >
                        Přihláška
                      </a>
                    </li>
                    <li>
                      <Link className="dropdown-item text-dropdown">
                        Odhláška ze studia
                      </Link>
                    </li>
                  </ul>
                </div>
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
    </div>
  );
};

export default NavigationLinks;
