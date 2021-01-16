import React from "react";
import classes from "./SidebarInputField.module.css";
import handleUserKeyPress from "../../Utilities/UtilityFunction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export const sidebarInputField = (props) => {
  return (
    <div className={classes.sidebarAddContact}>
      <input
        className={classes.sidebarInputField}
        placeholder="add new contact..."
        value={props.newContact}
        onChange={(event) => props.inputChangedHandler(event, "newContact")}
        onKeyPress={(event) => handleUserKeyPress(event, props.addNewContact)}
      ></input>
      <div className={classes.addContact} onClick={props.addNewContact}>
        <FontAwesomeIcon icon={faPlusCircle} />{" "}
      </div>
    </div>
  );
};

export default sidebarInputField;