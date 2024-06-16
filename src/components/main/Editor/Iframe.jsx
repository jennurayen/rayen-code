function Iframe({ srcDoc }) {
  return (
    <div className="output ">
      <iframe
        className="iframe-output"
        id="my_iframe "
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
      />
    </div>
  );
}
export default Iframe;
