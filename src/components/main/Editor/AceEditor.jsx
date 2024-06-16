return;
import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/ext-language_tools";

const CodeEditors = () => {
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");

  const handleRunCode = () => {
    const iframe =
      document.getElementById("resultFrame").contentWindow.document;
    iframe.open();
    iframe.writeln(`
      <style>${cssCode}</style>
      ${htmlCode}
      <script>${jsCode}</script>
    `);
    iframe.close();
  };

  return (
    <div>
      <iframe id="resultFrame" title="Result" width="100%" height="300px" />
      <button onClick={handleRunCode}>Run Code</button>
      <AceEditor
        mode="html"
        theme="monokai"
        name="editor1"
        width="100%"
        height="300px"
        onChange={setHtmlCode}
        value={htmlCode}
      />
      <AceEditor
        mode="css"
        theme="monokai"
        name="editor2"
        width="100%"
        height="300px"
        onChange={setCssCode}
        value={cssCode}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
      />
      <AceEditor
        mode="javascript"
        theme="monokai"
        name="editor3"
        width="100%"
        height="300px"
        onChange={setJsCode}
        value={jsCode}
      />
    </div>
  );
};

export default CodeEditors;
