import React from "react";
import * as FaIcons from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../App.css";

export default function Navbar() {
  //SIDEBAR VARIABLES
  const [sidebarVisibility, setSidebarVisibility] = React.useState(false);
  let location = useLocation();

  return (
    <div className="navbar">
      <div style={{ width: "100px" }}>
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onMouseOver={() => setSidebarVisibility(true)} />
        </Link>
      </div>
      <nav
        className={sidebarVisibility ? "nav-menu active" : "nav-menu"}
        onMouseLeave={() => setSidebarVisibility(false)}
      >
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars"></Link>
          </li>
          {SidebarData.map((item, index) => (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span style={{ paddingLeft: "5px" }}>{item.title}</span>
              </Link>
            </li>
          ))}
          <div style={{ paddingLeft: "5%" }}>
            <button
              className="sidebar-button"
              onClick={() => setSidebarVisibility(false)}
            >
              Exit
            </button>
          </div>
        </ul>
      </nav>
      <div className="navbar-right">{location.pathname}</div>
    </div>
  );
}
