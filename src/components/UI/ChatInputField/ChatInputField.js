import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import classes from "./ChatInputField.module.css";

export const inputField = (props) => {
  // this is input field for typing new text message
  // it imports ChattingButton component that sends
  // new text message onClick

  // sends message when user presses ENTER
  const handleUserKeyPress = e => {
    if (e.key === "Enter" && !e.shiftKey) {
     props.sendMessage();
    }
};


  return (
    <div className={classes.inputSection}>
      <textarea
        onKeyPress={handleUserKeyPress}
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
