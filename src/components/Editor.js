import React from "react";

class Editor extends React.Component {
  // for performance reasons we auto save only when the user is done typing
  typingTimer = null;
  handleAutoSave = () => {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.props.autoSaveHelper();
    }, 500);
  };

  render() {
    return (
      <textarea
        id="editor"
        style={{ fontSize: this.props.fontSize }}
        className={
          "editor flex-element " +
          (this.props.darkMode ? "editor-dark" : "editor-light")
        }
        onChange={this.props.handleEditorChange}
        onKeyUp={this.handleAutoSave}
        value={this.props.editorText}
      ></textarea>
    );
  }
}

export default Editor;
