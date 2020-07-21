import React from "react";
import { connect } from "react-redux";
import marked from "marked";
import { sanitize } from "dompurify";
import { saveAs } from "file-saver";
import { Modal, Button } from "react-bootstrap";
import ActionsBar from "./ActionsBar";
import Editor from "./Editor";
import Preview from "./Preview";
import Settings from "./Settings";
import { setEditorText, setPreview } from "../state/actions/appActions";

class App extends React.Component {
  state = {
    settingsOpen: false,
    modalActive: false,
    modalTitle: "",
    modalText: "",
    showSaveModal: localStorage.getItem("showSaveModal")
      ? JSON.parse(localStorage.getItem("showSaveModal"))
      : true,
  };
  handleEditorChange = (e) => {
    const value = e.target.value;
    this.props.dispatch(setEditorText(value));
    this.props.dispatch(setPreview(sanitize(marked(value))));
  };

  saveToLocalStorage = () => {
    localStorage.setItem("editorText", this.props.editorText);
    if (this.state.showSaveModal) {
      this.setState(() => ({
        modalActive: true,
        modalTitle: "Saved",
        modalText: "Markdown saved successfully",
      }));
    }
  };

  handleClear = () => {
    this.props.dispatch(setEditorText(""));
    this.props.dispatch(setPreview(""));
  };

  autoSaveHelper = () => {
    if (this.props.settings.editor.autoSave) {
      localStorage.setItem("editorText", this.props.editorText);
    }
  };

  disableOnSaveModal = () => {
    localStorage.setItem("showSaveModal", "false");
    this.setState(() => ({ showSaveModal: false }));
    this.handleModalClose();
  };

  handleModalClose = () => {
    this.setState(() => ({
      modalActive: false,
      modalText: "",
      modalTitle: "",
    }));
  };

  keyboardHandler = (e) => {
    if (e.keyCode === 83 && e.ctrlKey) {
      e.preventDefault();
      this.saveToLocalStorage();
    }
  };

  handleFileInput = (e) => {
    if (window.FileReader) {
      const file = e.target.files[0];
      const fileSize = file.size / 1024 / 1024;
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (fileSize < 3) {
          this.props.dispatch(setEditorText(e.target.result));
          this.props.dispatch(setPreview(sanitize(marked(e.target.result))));
        } else {
          this.setState(() => ({
            modalActive: true,
            modalTitle: "Alert",
            modalText:
              "Max upload size is 3 Mb, (you can still copy paste in the editor, but what the hell are you doing with a +3Mb markdown)",
          }));
        }
      };
      fileReader.readAsText(file);
    } else {
      this.setState(() => ({
        modalActive: true,
        modalTitle: "Error",
        modalText:
          "Your browser does not support FileReader API, please use an updated version of Firefox or Chrome",
      }));
    }
  };

  handleExport = (mode) => {
    let mime;
    let data;
    switch (mode) {
      case "html":
        mime = "text/html";
        data = this.props.preview;
        break;
      case "md":
        mime = "text/markdown";
        data = this.props.editorText;
        break;
      case "txt":
        mime = "";
        data = this.props.editorText;
        break;
      default:
        mime = "";
        data = "";
    }
    const blob = new Blob([data], {
      type: `${mime};charset=utf-8`,
    });
    saveAs(blob, `markdown.${mode}`);
  };

  handleCloseSettings = () => {
    this.setState(() => ({ settingsOpen: false }));
  };

  handleOpenSettings = () => {
    this.setState(() => ({ settingsOpen: true }));
  };

  componentDidMount = () => {
    document.addEventListener("keydown", this.keyboardHandler);
  };

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.keyboardHandler);
  };

  handlePersistSettings = () => {
    setTimeout(() => {
      localStorage.setItem("settings", JSON.stringify(this.props.settings));
    }, 500);
  };

  render = () => (
    <div className="fill">
      {!this.state.settingsOpen && (
        <div className="fill animate__animated animate__fadeIn">
          <Modal
            show={this.state.modalActive}
            onHide={this.handleModalClose}
            centered={true}
          >
            <Modal.Header closeButton>
              <Modal.Title>{this.state.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.modalText}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.handleModalClose}>
                Okey
              </Button>
              <Button variant="secondary" onClick={this.disableOnSaveModal}>
                Don't show this again
              </Button>
            </Modal.Footer>
          </Modal>
          <ActionsBar
            saveToLocalStorage={this.saveToLocalStorage}
            handleFileInput={this.handleFileInput}
            handleExport={this.handleExport}
            handleOpenSettings={this.handleOpenSettings}
            handleClear={this.handleClear}
          />
          <div className="flex-container">
            <Editor
              handleEditorChange={this.handleEditorChange}
              editorText={this.props.editorText}
              darkMode={this.props.settings.editor.darkMode}
              fontSize={this.props.settings.editor.fontSize}
              autoSaveHelper={this.autoSaveHelper}
            />
            <Preview
              preview={this.props.preview}
              darkMode={this.props.settings.preview.darkMode}
            />
          </div>
        </div>
      )}
      {this.state.settingsOpen && (
        <div className="fill animate__animated animate__slideInRight animate__faster  black-bg">
          <Settings
            handleCloseSettings={this.handleCloseSettings}
            handlePersistSettings={this.handlePersistSettings}
          />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({ app, settings }) => {
  return {
    editorText: app.editorText,
    preview: app.preview,
    settings,
  };
};
export default connect(mapStateToProps)(App);
