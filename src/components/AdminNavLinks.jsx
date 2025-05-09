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

const AdminNavLinks = () => {
  const [isCollapsed, setIsCollapsed] = useState("");

  const menu = [
    {
      label: "o škole",
      subMenu: [
        { label: "Aktuality", link: "/admin/o-skole/aktuality" },
        { label: "Základní údaje", link: "/admin/o-skole/zakladni-udaje" },
        {
          label: "Historie a současnost",
          link: "admin/o-skole/historie-a-soucasnost",
        },
        { label: "Studijní zaměření", link: "/admin/o-skole/studijni-zamereni" },
        { label: "Úspěchy školy", link: "/admin/o-skole/uspechy-skoly" },
      ],
    },
    {
      label: "pro rodiče a žáky",
      subMenu: [
        {
          label: "Rozvrh kolektivní výuky",
          link: "/admin/pro-rodice-a-zaky/rozvrh-kolektivni-vyuky",
        },
        { label: "Hudební nauka", link: "/admin/pro-rodice-a-zaky/hudebni-nauka" },
        { label: "Školné", link: "/admin/pro-rodice-a-zaky/skolne" },
        {
          label: "Přihláška",
          link: "https://klasifikace.jphsw.cz/application/default?hash=7e7757b1e12abcb736ab9a754ffb617a",
        },
        { label: "Odhláška ze studia", link: "" },
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
        { label: "Vedení školy", link: "/admin/kontakty/vedeni-skoly" },
        { label: "Učitelé", link: "/admin/kontakty/ucitele" },
      ],
    },
  ];

  return (
    <div className="nav-position-fixed ">
      <Navbar expand="md" className="nav-bg-admin ">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              fill
              className="navbar-container text-white justify-content-between navbar-width"
            >
              {menu.map((item) => (
                <Dropdown key={item.label} className="text-nav this-dropdown">
                  <DropdownToggle
                    id="dropdown-autoclose-true"
                    className="text-uppercase nav-buttons"
                  >
                    {item.label}
                  </DropdownToggle>
                  <DropdownMenu
                    renderOnMount={true}
                    rootCloseEvent="click"
                    className="submenu-admin"
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
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AdminNavLinks;
