import React from "react";
import classes from "./ErrorMessage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export const errorMessage = (props) => {
  let error = null;
  if (props.error) {
    error = props.error;
  }

  if (
    props.error &&
    (props.errorType == "errorSendingMessage" ||
      props.errorType == "errorAddingContact" ||
      props.errorType == "warning")
  ) {
    setTimeout(() => props.resetError(props.errorType), 2000);
  }

  switch (props.errorType) {
    // shows error message when HTTP GET request fails to get chats from backend ( request status is !==200)
    // in Messenger's statefull componnet
    case "errorLoadingChats":
      return (
        <div
          className={
            props.error
              ? `${classes.alertItemLogin} ${classes.alertItemLoginError}`
              : `${classes.inactiveLogin}`
          }
        >
          <div className={classes.data}>
            <p className={classes.title}>
              <span>Error</span>
            </p>
            <p className={classes.sub}>{error ? error : undefined}</p>
            <p>Please contact our support team </p>
          </div>
        </div>
      );

    // shows error message in chat, when new message was not sent (HTTP PUT request status !==200)
    case "errorSendingMessage":
      return (
        <div
          className={
            props.error
              ? classes.alertItemSendingMessage
              : classes.inactiveAlertItemSendingMessage
          }
        >
          Message not sent
        </div>
      );

    // shows error message in chat, when new contact was not successfully added (HTTP PUT request status !==200)
    case "errorAddingContact":
      return (
        <div
          className={
            props.error
              ? `${classes.alertItemSendingMessage} ${classes.errorAddingContact}`
              : classes.inactiveAlertItemSendingMessage
          }
        >
          Contact not added
        </div>
      );

    // shows error message (warning) when user tries to login
    // without providing email and password
    case "warning":
      return (
        <div
          className={
            props.error
              ? `${classes.alertItemLogin} ${classes.warning}`
              : `${classes.inactiveLogin}`
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
