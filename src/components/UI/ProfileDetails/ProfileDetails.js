import React from "react";
import classes from "./ProfileDetails.module.css";

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
      <div className={props.error ? classes.show : classes.hide}>
        Too many characters!
      </div>
    </div>
  );
};

export default profileDetails;
