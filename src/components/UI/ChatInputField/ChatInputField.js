import React from "react";
import handleUserKeyPress from '../../Utilities/UtilityFunction';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import classes from "./ChatInputField.module.css";

export const inputField = (props) => {
  // this is input field for typing new text message
  // it sends HTTP PUT request and updates this.state.data in messenger component
  // when user presses ENTER of clicks faPaperPlane icon

  return (
    <div className={classes.inputSection}>
      <textarea
        onKeyPress={(event) => handleUserKeyPress(event, props.sendMessage)}
        className={classes.inputField}
        placeholder="type your message here..."
        value={props.newMessage}
        onChange={props.inputChangedHandler}
      />
      <div className={classes.sendButton} onClick={props.sendMessage}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </div>
    </div>
  );
};

export default inputField;
