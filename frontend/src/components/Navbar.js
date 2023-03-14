import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersBetweenLines } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <header>
      <h1>Employee Directory</h1>
      <FontAwesomeIcon icon={faUsersBetweenLines} size="2x" color="blue" />
    </header>
  );
}

export default Navbar;
