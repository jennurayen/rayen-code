import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "./main/Editor/Button";
import Select from "react-select";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function Update() {
  const linkIdValue = useParams();

  const [openedEditor, setOpenedEditor] = useState("html");
  const [activeButton, setActiveButton] = useState("html");

  const [postid, setPostid] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [getuserid, setGetUserId] = useState("");
  const [getusername, setGetUserName] = useState("");

  const [updateBtnColor, setUpdateBtnColor] = useState(true);

  const { user, isAuthenticated } = useAuth0();

  let [category, setCategory] = useState({});
  let [categoryno, setCategoryno] = useState(0);

  const categoryOptions = [
    { value: "button", label: "Button" },
    { value: "text", label: "Text" },
    { value: "checkbox", label: "Checkbox" },
    { value: "toggle", label: "Toggle Switch" },
    { value: "card", label: "Card" },
    { value: "loader", label: "Loader" },
    { value: "input", label: "Input" },
    { value: "radio", label: "Radio" },
    { value: "form", label: "Form" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost/rayencode/api/api.php/" + linkIdValue.id)
      .then((res) => {
        setPostid(res.data.postid);
        setHtmlCode(res.data.html);
        setCssCode(res.data.css);
        setJsCode(res.data.javascript);
        findCategory(res.data.category);
        setGetUserId(res.data.userid);
        setGetUserName(res.data.username);
      });
  }, []);

  function findCategory(val) {
    categoryOptions.map((cat, index) => {
      if (cat.value == val) {
        setCategoryno(index);
        setCategory(categoryOptions[index]);
      }
    });
  }
  const onTabClick = (editorName) => {
    setOpenedEditor(editorName);
    setActiveButton(editorName);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      const iframe =
        document.getElementById("resultFrame").contentWindow.document;
      iframe.open();
      iframe.writeln(`
        <style>${cssCode}</style>
        ${htmlCode}
        <script>${jsCode}</script>
      `);
      iframe.close();
    }, 750);
    setUpdateBtnColor(false);
    return () => clearTimeout(timeOut);
  }, [htmlCode, cssCode, jsCode, categoryno]);

  // function updatecode() {
  //   let codevalue = {
  //     post_id: postid,
  //     html: htmlCode,
  //     css: cssCode,
  //     javascript: jsCode,
  //     category: category.value,
  //     active: false,
  //   };
  //   axios
  //     .put("http://localhost/rayencode/api/api.php", codevalue)
  //     .then((res) => {
  //       setUpdateBtnColor(res.data.status);
  //     });
  // }
  function updatecode() {
    let codevalue = {
      post_id: postid,
      html: htmlCode,
      css: cssCode,
      javascript: jsCode,
      category: category.value,
      active: false,
    };

    fetch("http://localhost/rayencode/api/api.php", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(codevalue),
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdateBtnColor(data.status);
      });
  }

  let height = "50vh";
  return (
    <div className="editor-container">
      <div className="user-details">
        Publish by: <span>{getusername}</span>
      </div>
      <div className="output">
        <iframe
          id="resultFrame"
          title="Result"
          width="100%"
          height="100%"
          style={{ background: "white" }}
        />
      </div>
      <div className="code-area">
        <div className="tab-button-container">
          <div>
            <Button
              backgroundColor={activeButton === "html" ? "#156" : ""}
              title="HTML"
              onClick={() => {
                onTabClick("html");
              }}
            />
            <Button
              backgroundColor={activeButton === "css" ? "#156" : ""}
              title="CSS"
              onClick={() => {
                onTabClick("css");
              }}
            />
            <Button
              backgroundColor={activeButton === "js" ? "#156" : ""}
              title="JavaScript"
              onClick={() => {
                onTabClick("js");
              }}
            />
            <div className="select-category">
              <Select
                options={categoryOptions}
                value={category}
                onChange={setCategory}
                styles={{
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    color: state.isSelected ? "#22f59d" : "#002024",
                    background: state.isSelected ? "rgb(17, 85, 102)" : "white",
                  }),
                }}
              />
            </div>
          </div>

          {isAuthenticated ? (
            user.sub == getuserid ? (
              <button onClick={updatecode} className="update submit-btn">
                Update Review{" "}
                {updateBtnColor ? (
                  <i className="fa-solid fa-check save"></i>
                ) : (
                  <i className="fa-solid fa-circle-exclamation unsave"></i>
                )}
              </button>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>

        <div className="editor-three">
          {openedEditor === "html" ? (
            //
            <AceEditor
              mode="html"
              theme="monokai"
              name="editor1"
              width="100%"
              fontSize={18}
              height={height}
              onChange={setHtmlCode}
              value={htmlCode}
            />
          ) : openedEditor === "css" ? (
            <AceEditor
              mode="css"
              theme="monokai"
              name="editor2"
              width="100%"
              fontSize={18}
              height={height}
              onChange={setCssCode}
              value={cssCode}
            />
          ) : (
            <AceEditor
              mode="javascript"
              theme="monokai"
              name="editor3"
              width="100%"
              fontSize={18}
              height={height}
              onChange={setJsCode}
              value={jsCode}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Update;
