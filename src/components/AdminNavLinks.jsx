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

const AdminNavLinks = () => {
  const [hoveredMenu, setHoveredMenu] = useState();
  const isMobile = useMedia({ maxWidth: "767px" });

  const menu = [
    {
      label: "Úvod",
      link: "/admin/uvod/aktuality",
    },
    {
      label: "o škole",
      subMenu: [
        { label: "Základní údaje", link: "/admin/o-skole/zakladni-udaje" },
        {
          label: "Historie a současnost",
          link: "/admin/o-skole/historie-a-soucasnost",
        },
        {
          label: "Studijní zaměření",
          link: "/admin/o-skole/studijni-zamereni",
        },
        { label: "Úspěchy školy", link: "/admin/o-skole/uspechy-skoly" },
      ],
    },
    {
      label: "pro rodiče a žáky",
      subMenu: [
        {
          label: "Přijímací a talentové zkoušky",
          link: "/admin/pro-rodice-a-zaky/prijimaci-zkousky",
        },
        {
          label: "Rozvrh kolektivní výuky",
          link: "/admin/pro-rodice-a-zaky/rozvrh-kolektivni-vyuky",
        },
        {
          label: "Hudební nauka",
          link: "/admin/pro-rodice-a-zaky/hudebni-nauka",
        },
        { label: "Školné", link: "/admin/pro-rodice-a-zaky/skolne" },
        {
          label: "Přihláška",
          link: "https://klasifikace.jphsw.cz/application/default?hash=7e7757b1e12abcb736ab9a754ffb617a",
        },
      ],
    },
    {
      label: "galerie",
      subMenu: [
        { label: "Foto", link: "/admin/galerie/foto" },
        { label: "Video", link: "/admin/galerie/video" },
      ],
    },
    {
      label: "úřední deska",
      subMenu: [
        {
          label: "Ochrana osobních údajů",
          link: "/admin/uredni-deska/ochrana-osobnich-udaju",
        },
        {
          label: "Povinně zveřejňované inforamce",
          link: "/admin/uredni-deska/povinne-info",
        },
        { label: "Organizace školního roku", link: "" },
        {
          label: "Školní vzdělávací program",
          link: "/admin/uredni-deska/skolni-vzdelavaci-program",
        },
        { label: "Školní řád", link: "/admin/uredni-deska/skolni-rad" },
        { label: "Výroční zprávy", link: "/admin/uredni-deska/vyrocni-zpravy" },
      ],
    },
    {
      label: "kontakty",
      subMenu: [
        { label: "Obecné informace", link: "/admin/kontakty/obecne-informace" },
        { label: "Vedení školy", link: "/admin/kontakty/vedeni-skoly" },
        { label: "Učitelé", link: "/admin/kontakty/ucitele" },
      ],
    },
    { label: "Podpora školy", link: "/admin/podpora-skoly" },
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
      <Navbar expand="md" className="nav-bg-admin ">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              fill
              className="navbar-container text-white justify-content-start navbar-width"
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
                    className="text-nav this-dropdown"
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
                      className={`submenu-admin ${
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

export default AdminNavLinks;
