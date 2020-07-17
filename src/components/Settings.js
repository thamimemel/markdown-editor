import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { Container } from "@material-ui/core";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import {
  setEditorDarkMode,
  setEditorAutoSave,
  setEditorFontSize,
  setPreviewDarkMode,
} from "../state/actions/settingsActions";

const Settings = (props) => (
  <Container>
    <div className="settings">
      <div className="d-flex justify-content-between align-content-center mt-3">
        <h2>Editor</h2>
        <div
          className="mr-2 close-settings"
          onClick={props.handleCloseSettings}
        >
          <CloseIcon className="settings-close-button" fontSize="large" />
        </div>
      </div>
      <div>
        <Form className="ml-4" onChange={props.handlePersistSettings}>
          <h4>Dark Mode</h4>
          <Form.Check
            type="radio"
            id="dark-mode-editor-enable"
            label="Enable"
            checked={props.settings.editor.darkMode}
            name="dark-mode-editor"
            onChange={() => props.dispatch(setEditorDarkMode(true))}
          ></Form.Check>
          <Form.Check
            type="radio"
            id="dark-mode-editor-disable"
            label="Disable"
            checked={!props.settings.editor.darkMode}
            name="dark-mode-editor"
            onChange={() => props.dispatch(setEditorDarkMode(false))}
          ></Form.Check>
          <h4>Autosave</h4>
          <Form.Check
            type="radio"
            id="autosave-enable"
            label="Enable"
            checked={props.settings.editor.autoSave}
            name="autosave-editor"
            onChange={() => props.dispatch(setEditorAutoSave(true))}
          ></Form.Check>
          <Form.Check
            type="radio"
            id="autosave-disable"
            label="Disable"
            checked={!props.settings.editor.autoSave}
            name="autosave-editor"
            onChange={() => props.dispatch(setEditorAutoSave(false))}
          ></Form.Check>
          <h4>FontSize</h4>
          <input
            type="number"
            step="4"
            value={props.settings.editor.fontSize}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              console.log(value);
              if (Number.isInteger(value)) {
                props.dispatch(setEditorFontSize(value));
              }
            }}
          ></input>
        </Form>
      </div>
      <h2 className="mt-4">Preview</h2>
      <Form className="ml-4" onChange={props.handlePersistSettings}>
        <h4>Dark Mode</h4>
        <Form.Check
          type="radio"
          id="dark-mode-previw-enable"
          label="Enable"
          checked={props.settings.preview.darkMode}
          name="dark-mode-preview"
          onChange={() => props.dispatch(setPreviewDarkMode(true))}
        ></Form.Check>
        <Form.Check
          size="large"
          type="radio"
          id="dark-mode-preview-disable"
          label="Disable"
          checked={!props.settings.preview.darkMode}
          name="dark-mode-preview"
          onChange={() => props.dispatch(setPreviewDarkMode(false))}
        ></Form.Check>
      </Form>
    </div>
  </Container>
);

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
  };
};
export default connect(mapStateToProps)(Settings);
