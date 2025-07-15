import { useState } from "react";
import {
  Container,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import useMedia from "use-media";

const NavLinks = () => {
  const [hoveredMenu, setHoveredMenu] = useState();
  const isMobile = useMedia({ maxWidth: "767px" });

  const menu = [
    {
      label: "Úvod",
      link: "/uvod/aktuality",
    },
    {
      label: "o škole",
      subMenu: [
        { label: "Základní údaje", link: "/o-skole/zakladni-udaje" },
        {
          label: "Historie a současnost",
          link: "/o-skole/historie-a-soucasnost",
        },
        { label: "Studijní zaměření", link: "/o-skole/studijni-zamereni" },
        { label: "Úspěchy školy", link: "/o-skole/uspechy-skoly" },
      ],
    },
    {
      label: "pro rodiče a žáky",
      subMenu: [
        {
          label: "Přijímací a talentové zkoušky",
          link: "/pro-rodice-a-zaky/prijimaci-zkousky",
        },
        {
          label: "Rozvrh kolektivní výuky",
          link: "/pro-rodice-a-zaky/rozvrh-kolektivni-vyuky",
        },
        { label: "Hudební nauka", link: "/pro-rodice-a-zaky/hudebni-nauka" },
        { label: "Školné", link: "/pro-rodice-a-zaky/skolne" },
        {
          label: "Přihláška",
          link: "https://klasifikace.jphsw.cz/application/default?hash=7e7757b1e12abcb736ab9a754ffb617a",
        },
      ],
    },
    {
      label: "galerie",
      subMenu: [
        { label: "Foto", link: "/galerie/foto" },
        { label: "Video", link: "/galerie/video" },
      ],
    },
    {
      label: "úřední deska",
      subMenu: [
        {
          label: "Ochrana osobních údajů",
          link: "/uredni-deska/ochrana-osobnich-udaju",
        },
        {
          label: "Povinně zveřejňované inforamce",
          link: "/uredni-deska/povinne-info",
        },
        { label: "Organizace školního roku", link: "" },
        {
          label: "Školní vzdělávací program",
          link: "/uredni-deska/skolni-vzdelavaci-program",
        },
        { label: "Školní řád", link: "/uredni-deska/skolni-rad" },
        { label: "Výroční zprávy", link: "/uredni-deska/vyrocni-zpravy" },
      ],
    },
    {
      label: "kontakty",
      subMenu: [
        { label: "Obecné informace", link: "/kontakty/obecne-informace" },
        { label: "Vedení školy", link: "/kontakty/vedeni-skoly" },
        { label: "Učitelé", link: "/kontakty/ucitele" },
      ],
    },
    { label: "Podpora školy", link: "/podpora-skoly" },
  ];

  const handleOnMouseEnter = (itemName) => {
    if (!isMobile) {
      setHoveredMenu(itemName);
    } else {
      return null;
    }
  };

  const handleOnMouseLeave = () => {
    if (!isMobile) {
      setHoveredMenu(null);
    } else {
      return null;
    }
  };

  const handleShow = (itemName) => {
    if (hoveredMenu === itemName) {
      return true;
    }
  };

  return (
    <div className="nav-position-fixed ">
      <Navbar expand="md" className="nav-bg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              fill
              className="navbar-container text-white d-flex justify-content-start navbar-width mt-1"
            >
              {menu.map((item, index) =>
                item.link ? (
                  <Link
                    to={item.link}
                    className={`text-uppercase text-white nav-button ${
                      isMobile ? "mt-1 mb-1" : ""
                    }`}
                    style={{
                      textDecoration: "none",
                      alignSelf: `${isMobile ? "start" : "center"}`,
                      marginLeft: `${isMobile ? "12px" : "10px"}`,
                    }}
                    key={index}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Dropdown
                    key={item.label}
                    className="text-nav"
                    onMouseLeave={() => handleOnMouseLeave()}
                    onMouseEnter={() => handleOnMouseEnter(item.label)}
                    show={handleShow(item.label)}
                  >
                    <DropdownToggle
                      id="dropdown-autoclose-true"
                      className="text-uppercase nav-buttons"
                    >
                      {item.label}
                    </DropdownToggle>
                    <DropdownMenu
                      renderOnMount={true}
                      rootCloseEvent="click"
                      className={`submenu ${
                        isMobile ? "" : "opacity"
                      } rounded-0`}
                    >
                      {item.subMenu.map((subItem) => (
                        <Dropdown.Item
                          key={subItem.label}
                          as={Link}
                          to={subItem.link}
                          className="text-nav"
                        >
                          {subItem.label}{" "}
                        </Dropdown.Item>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                )
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavLinks;
