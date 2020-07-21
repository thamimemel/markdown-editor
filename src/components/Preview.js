import React from "react";

const Preview = (props) => {
  if (props.preview) {
    return (
      <div
        id="preview"
        className={
          "preview flex-element " + (props.darkMode ? "preview-dark" : "")
        }
        dangerouslySetInnerHTML={{ __html: props.preview }}
      ></div>
    );
  } else {
    return (
      <div id="preview" className={"preview flex-element preview__empty "}>
        <div>Let's Add Something </div>
        <div className="lds-ripple">
          <div></div>
        </div>
      </div>
    );
  }
};

export default Preview;
