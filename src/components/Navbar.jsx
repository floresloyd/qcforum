import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          QC Forum
        </NavLink>
        <div className="nav-links">
          {" "}
          {/* This div will now align the links to the right */}
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/create" className="nav-link">
            Create
          </NavLink>
          <NavLink to="/search" className="nav-link">
            Search
          </NavLink>
          <NavLink to="/recent" className="nav-link">
            Recent
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
