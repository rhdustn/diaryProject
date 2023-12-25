import React from "react";
import { Link } from "react-router-dom";

const RouteTest = () => {
  return (
    <div>
      <Link to={"/"}>Home</Link>
      <br />
      <Link to={"/create"}>Create</Link>
      <br />
      <Link to={"/list"}>List</Link>
      <br />
      <Link to={"/edit"}>Edit</Link>
    </div>
  );
};

export default RouteTest;
