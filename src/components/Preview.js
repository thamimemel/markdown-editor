import React from "react";

const Preview = (props) => (
  <div
    id="preview"
    className={"preview flex-element " + (props.darkMode ? "preview-dark" : "")}
    dangerouslySetInnerHTML={{ __html: props.preview }}
  ></div>
);

export default Preview;
