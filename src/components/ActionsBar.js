import React from "react";
import { Navbar, Nav, Button, DropdownButton, Dropdown } from "react-bootstrap";
import SettingsIcon from "@material-ui/icons/Settings";

const ActionsBar = (props) => (
  <Navbar bg="dark" variant="dark">
    <Nav className="mr-auto">
      <DropdownButton id="export-button" title="Export" variant="dark">
        <Dropdown.Item onClick={() => props.handleExport("html")}>
          as .html
        </Dropdown.Item>
        <Dropdown.Item onClick={() => props.handleExport("md")}>
          as .md
        </Dropdown.Item>
        <Dropdown.Item onClick={() => props.handleExport("txt")}>
          as .txt
        </Dropdown.Item>
      </DropdownButton>
      <Button
        id="import-button"
        variant="dark"
        onClick={() => {
          const fileInput = document.getElementById("fileInput");
          fileInput.click();
        }}
      >
        <input
          type="file"
          id="fileInput"
          onChange={props.handleFileInput}
          accept=".txt,.md,"
        />
        Import
      </Button>
      <Button
        id="save-button"
        variant="dark"
        onClick={props.saveToLocalStorage}
      >
        Save
      </Button>
      <Button id="clear-button" variant="dark" onClick={props.handleClear}>
        Clear
      </Button>
    </Nav>
    <Button variant="dark" onClick={props.handleOpenSettings}>
      <SettingsIcon />
    </Button>
  </Navbar>
);

export default ActionsBar;
