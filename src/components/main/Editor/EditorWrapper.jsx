import React, { useState, useEffect } from "react";
import Button from "./Button";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import axios from "axios";
import Select from "react-select";
import { useAuth0 } from "@auth0/auth0-react";

function EditorWrapper() {
  const { user, isAuthenticated } = useAuth0();
  const [isPublishAllow, setIsPublishAllow] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [postid, setPostid] = useState("");
  const [needSave, setNeedSave] = useState(false);

  const [openedEditor, setOpenedEditor] = useState("html");
  const [activeButton, setActiveButton] = useState("html");

  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const onTabClick = (editorName) => {
    setOpenedEditor(editorName);
    setActiveButton(editorName);
  };

  let [category, setCategory] = useState({ value: "", label: "" });

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

  // console.log(user);
  function publishcode() {
    // creating a random post id
    let post_id = `${Date.now()}${Math.floor(Math.random() * 10000)}`;
    setPostid(post_id);

    let codevalue = {
      postid: post_id,
      html: htmlCode,
      css: cssCode,
      javascript: jsCode,
      category: category.value,
      active: false,
      userid: user.sub,
      user_name: user.name,
    };
    setIsLoading(true);
    // http://localhost/rayencode/api/
    axios
      .post("http://localhost/rayencode/api/api.php", codevalue)
      .then((res) => {
        if (res.data.status) {
          setIsPublished(true);
          setNeedSave(false);
        }
        setIsLoading(false);
      });
  }

  //
  function updatecode() {
    let codevalue = {
      post_id: postid,
      html: htmlCode,
      css: cssCode,
      javascript: jsCode,
      category: category.value,
      active: false,
    };
    axios
      .put("http://localhost/rayencode/api/api.php", codevalue)
      .then((res) => {
        if (res.data.status) {
          setNeedSave(false);
        }
      });
    //
  }

  useEffect(() => {
    if (category.value != "") {
      setIsPublishAllow(true);
      setNeedSave(true);
    }
  }, [category]);

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
      setNeedSave(true);
    }, 750);
    return () => clearTimeout(timeOut);
  }, [htmlCode, cssCode, jsCode]);

  // let height = "400px";
  let height = "50vh";

  return (
    <div className="editor-container">
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
                onChange={setCategory}
                placeholder="category"
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
            <button
              disabled={isPublishAllow ? false : true}
              className={`publish submit-btn ${
                isPublishAllow ? "" : "btn-not-allow"
              } ${needSave ? "saveneed" : ""}`}
              onClick={isPublished ? updatecode : publishcode}
            >
              {isPublished ? "Save (review)" : "Send (Review)"}{" "}
              {isLoading ? (
                <i className="fa-solid fa-spinner"></i>
              ) : (
                <i className="fa-regular fa-paper-plane"></i>
              )}
            </button>
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
export default EditorWrapper;
