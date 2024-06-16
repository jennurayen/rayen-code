import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { linkClick } from "../../redux/AsideSlice";

function NoPostAvl() {
  const dispathc = useDispatch();

  return (
    <div className="no-post">
      <h2>No Post available</h2>
      <Link onClick={() => dispathc(linkClick("all"))} to="/components">
        <i className="fa-solid fa-left-long"></i> Back
      </Link>
    </div>
  );
}

export default NoPostAvl;
