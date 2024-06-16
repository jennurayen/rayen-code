import { NavLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pageload, linkClick } from "../redux/AsideSlice";
import { useEffect } from "react";

function Aside() {
  let { category } = useParams();
  const dispathc = useDispatch();

  useEffect(() => {
    dispathc(pageload(category));
  }, [category]);

  function clickLink(cate) {
    dispathc(linkClick(cate));
  }

  return (
    <aside>
      <div className="sidebar">
        <ul>
          <li>
            <NavLink
              onClick={() => clickLink("all")}
              className={category ? "" : "all-active"}
              to="/components"
            >
              All
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => clickLink("button")}
              to="/components/button"
            >
              Button
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => clickLink("text")} to="/components/text">
              Text
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => clickLink("checkbox")}
              to="/components/checkbox"
            >
              Checkbox
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => clickLink("toggle")}
              to="/components/toggle"
            >
              Toggle Switch
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => clickLink("card")} to="/components/card">
              Card
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => clickLink("loader")}
              to="/components/loader"
            >
              Loader
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => clickLink("input")} to="/components/input">
              Input
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => clickLink("radio")} to="/components/radio">
              Radio
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => clickLink("form")} to="/components/form">
              Form
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}
export default Aside;
