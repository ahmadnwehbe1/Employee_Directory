import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <Link to="/">
        <h1>Employee Directory</h1>
      </Link>

      <Link style={{ fontWeight: "bold", fontSize: "24px" }} to="/employee/add">
        Add Employee
      </Link>
    </header>
  );
}

export default Navbar;
