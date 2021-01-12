import React from "react";
import classes from "./ErrorMessage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export const errorMessage = (props) => {
  let error = null;
  if (props.error) {
    error = props.error;
    setTimeout(() => props.resetError(), 2000);
  }

  switch (props.errorType) {
    case "error":
      return (
        <div
          className={
            props.error ? `${classes.alertItem}` : `${classes.inactive}`
          }
        >
          <div className={classes.data}>
            <p className={classes.title}>
              <span>Error</span>
            </p>
            <p className={classes.sub}>{error ? error : undefined}</p>
          </div>

          <FontAwesomeIcon
            icon={faTimesCircle}
            className={classes.close}
            onClick={props.resetError}
          />
        </div>
      );

    case "warning":
      return (
        <div
          className={
            props.error
              ? `${classes.alertItem} ${classes.warning}`
              : `${classes.inactive}`
          }
        >
          <div className={classes.data}>
            <p className={classes.title}>
              <span>Warning</span>
            </p>
            <p className={classes.sub}>{error ? error : undefined}</p>
          </div>

          <FontAwesomeIcon
            icon={faTimesCircle}
            className={classes.close}
            onClick={props.resetError}
          />
        </div>
      );

    default:
      return "";
  }
};

export default errorMessage;
