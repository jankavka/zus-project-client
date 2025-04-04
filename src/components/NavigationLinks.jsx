import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, Dropdown } from "bootstrap";

const NavigationLinks = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const buttons = document.querySelectorAll(".nav-link");
    const dropdowns = document.querySelectorAll(".dropdown-menu");
    const navigation = document.querySelector(".navbar");

    //Opens sub menu dropdowns
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        dropdowns.forEach((dropdown) => {
          if (button.contains(event.target) && window.innerWidth < 1000) {
            const dropdownInstance = Dropdown.getOrCreateInstance(event.target);
            dropdownInstance.toggle();
          }
        });
      });
    });

    //Closes navbar while clicking outside of navbar
    const hideNavbar = (event) => {
      if (navigation && !navigation.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", hideNavbar);

    return () => {
      document.removeEventListener("click", hideNavbar);

      buttons.forEach((button) => {
        button.removeEventListener("click", (event) => {
          dropdowns.forEach((dropdown) => {
            if (button.contains(event.target) && window.innerWidth < 600) {
              const dropdownInstance = Dropdown.getOrCreateInstance(
                event.target
              );
              dropdownInstance.toggle();
            }
          });
        });
      });
      
    };

  }, []);

  return (
    <div className="nav-position-fixed">
      <nav className="navbar navbar-expand-sm nav-bg">
        <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navigace"
        >
          <div className="container-fluid">
            <ul className="navbar-nav navbar-container justify-content-between">
              <li className="nav-item">
                <div className="dropdown">
                  <button
                    className="nav-link nav-text text-uppercase"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    o škole
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item text-dropdown"
                        to={"/o-skole/aktuality"}
                      >
                        Aktuality
                      </Link>
                    </li>
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
                        Studijní zaměření
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
                    data-bs-toggle="dropdown"
                  >
                    pro rodiče a žáky
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item text-dropdown"
                        to={"/pro-rodice-a-zaky/rozvrh-kolektivni-vyuky"}
                      >
                        Rozvrh kolektivní výuky
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
                      <Link className="dropdown-item text-dropdown" to>
                        Odhláška ze studia
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
                    data-bs-toggle="dropdown"
                  >
                    galerie
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item text-dropdown"
                        to={"/galerie/foto"}
                      >
                        Foto
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-dropdown"
                        to={"/galerie/video"}
                      >
                        Video
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
                    data-bs-toggle="dropdown"
                  >
                    úřední deska
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item text-dropdown"
                        to={"/uredni-deska/ochrana-osobnich-udaju"}
                      >
                        Ochrana osobních údajů
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-dropdown"
                        to={"/uredni-deska/povinne-info"}
                      >
                        Povinně zveřejňované informace
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-dropdown">
                        Organizace školního roku
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-dropdown"
                        to={"/uredni-deska/skolni-vzdelavaci-program"}
                      >
                        Školní vzdělávací program
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-dropdown" to={"/uredni-deska/skolni-rad"}
                      
                      >
                        Školní řád
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-dropdown"
                        to={"/uredni-deska/vyrocni-zpravy"}
                      >
                        Výroční zprávy
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
                    data-bs-toggle="dropdown"
                  >
                    kontakty
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item text-dropdown"
                        to={"/kontakty/vedeni-skoly"}
                      >
                        Vedení školy
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-dropdown"
                        to={"/kontakty/ucitele"}
                      >
                        Učitelé
                      </Link>
                    </li>
                  </ul>
                </div>
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
