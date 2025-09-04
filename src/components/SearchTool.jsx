import { useState } from "react";
import { Dropdown, DropdownMenu } from "react-bootstrap";

const SearchTool = () => {
  const [isVisible, setIsVisible] = useState(false);
  //created for local dev
  //const backend = import.meta.env.VITE_BACKEND_ORIGIN || ""

  return (
    <Dropdown
      autoClose="outside"
      className="text-nav"
      show={isVisible}
      //onToggle={setIsVisible}
      onToggle={(next, meta) => {
        if (meta?.source === "select") return;
        setIsVisible(next);
      }}
    >
      <Dropdown.Toggle
        id="dropdown-button-dark-example1"
        className="text-uppercase nav-buttons"
      >
        <div className="search"></div>
      </Dropdown.Toggle>

      <DropdownMenu
        className={`submenu rounded-0 p-3`}
        style={{ minWidth: 260 }}
      >
        <form action={`/search`} method="GET" role="search">
          <div className="mb-2">
            <input type="search" name="query" className="form-control" />
          </div>

          <button
            type="submit"
            className="btn btn-secondary w-100 text-nav"
          >
            Hledat
          </button>
        </form>
        <Dropdown.Item
          onClick={() => setIsVisible(false)}
          className="text-nav w-100 text-center"
        >
          Zavřít X
        </Dropdown.Item>
      </DropdownMenu>
    </Dropdown>
  );
};

export default SearchTool;
