import React from "react";
import classes from "./ChatInputField.module.css";
import ChattingButton from "../Buttons/ChattingButton/ChattingButton";

export const inputField = (props) => {
  // this is input field for typing new text message
  // it imports ChattingButton component that sends
  // new text message onClick

  return (
    <div className={classes.inputSection}>
      <textarea
        className={classes.inputField}
        placeholder="type your message here..."
        onChange={props.inputChangedHandler}
      />
      <ChattingButton sendMessage={props.sendMessage} />
    </div>
  );
};

export default inputField;
