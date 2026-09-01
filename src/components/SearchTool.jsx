import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownMenu } from "react-bootstrap";

const SearchTool = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setIsVisible(false);
    navigate(`/vyhledavani?query=${encodeURIComponent(trimmed)}`);
  };

  return (
    <Dropdown
      autoClose="outside"
      className="text-nav"
      show={isVisible}
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
        <form onSubmit={handleSubmit} role="search">
          <div className="mb-2">
            <input
              type="search"
              name="query"
              className="form-control"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
            />
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
