import React from "react";
import classes from "./ProfileDetails.module.css";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

export const profileDetails = (props) => {
  return (
    <div>
      <div className={classes.profileDetails}>
        <div className={classes.label}>{props.label}</div>
        <input
          className={classes.details}
          value={props.details}
          onChange={(event) => props.inputChangedHandler(event, props.index)}
        ></input>
      </div>
      <ErrorMessage
        error={props.error ? "tooManyChars" : undefined}
        errorType="tooManyChars"
      />
    </div>
  );
};

export default profileDetails;
