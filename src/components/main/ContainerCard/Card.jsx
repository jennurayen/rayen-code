import { useEffect } from "react";
import { Link } from "react-router-dom";

function Card({ codevalue }) {
  useEffect(() => {
    const iframe = document.getElementById(`${codevalue.id}`).contentWindow
      .document;
    iframe.open();
    iframe.writeln(`
    <style>${codevalue.css}</style>
    ${codevalue.html}
    <script>${codevalue.javascript}</script>
  `);
    iframe.close();
  }, []);

  return (
    <div className="card">
      <div className="card-output">
        <iframe
          id={`${codevalue.id}`}
          title="Custom Iframe"
          style={{ width: "100%", height: "100%", background: "#fff" }}
        />
      </div>
      <div className="card-opt">
        <div className="post-by">
          <i className="fa-regular fa-circle-user"></i> {codevalue.username}
        </div>
        <Link
          to={`/components/update/${codevalue.postid}`}
          className="get-code"
        >
          <i className="fa-solid fa-code"></i> Code
        </Link>
      </div>
    </div>
  );
}
export default Card;
