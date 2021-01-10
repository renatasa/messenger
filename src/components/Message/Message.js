import React from "react";
import classes from "./Message.module.css";

export const message = (props) => {
  // this component receives
  // props from Messenger statefull component
  // and displays single user message

  let me;

  props.author == "me" ? (me = true) : (me = false);

  return (
    <div
      className={
        me
          ? `${classes.textDiv} ${classes.myTextDiv}`
          : `${classes.textDiv} ${classes.notMyTextDiv}`
      }
    >
      <div
        className={
          me
            ? `${classes.text} ${classes.myText}`
            : `${classes.text} ${classes.notMyText}`
        }
      >
        {props.messageText}
      </div>
    </div>
  );
};

export default message;
