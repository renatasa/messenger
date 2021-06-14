import React, { Component } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import InputField from "../../components/UI/ChatInputField/ChatInputField";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Navbar from "../../components/Navbar/Navbar";
import { connect } from "react-redux";
import classes from "./Messenger.module.css";
import {
  createMessagingSection,
  createErrorMessage,
  createSpinner,
  addNewContact,
  sendMessage,
} from "./service";
import {redirectTo} from "../utils/serviceUtils";
import { chatsDataGetRequest, sendPutRequest } from "../api/messengerApi";
import { constants } from "./constants";

export class Messenger extends Component {
  // different css is applied for different type of error
  state = {
    data: [],
    selectedChat: 0,
    newMessage: "",
    newContact: "",
    errorLoadingChats: "",
    errorSendingMessage: "",
    errorAddingContact: "",
    showSidebar: true,
  };

  componentDidMount() {
    if (this.props.email !== null && this.props.password !== null) {
      chatsDataGetRequest(this.checkRequestStatusUpdateState);
    }
  }

  componentDidUpdate() {
    if (
      this.props.email !== null &&
      this.props.password !== null &&
      this.state.data.length>0
    ) {
      this.scrollToBottom();
    }
  }

  checkRequestStatusUpdateState = (req, newData, error, clearInput) => {
    if (req.status !== 200) {
      this.setState({ [error]: req["data"]["message"] });
    } else if (clearInput === constants.doNotClearInput) {
      this.setState({
        data: newData,
        [error]: "",
      });
    } else {
      this.setState({
        data: newData,
        [clearInput]: constants.emptyString,
        [error]: "",
      });
    }
  };

  selectChat = (index) => {
    this.setState({ selectedChat: index });
    this.hideSidebar();
  };

  inputChangedHandler = (event, inputName) => {
    event.preventDefault();
    this.setState({ [inputName]: event.target.value });
  };

  resetError = (errorType) => {
    this.setState({ [errorType]: "" });
  };

  showSidebarFunction = () => {
    this.setState({ showSidebar: true });
  };

  hideSidebar = () => {
    this.setState({ showSidebar: false });
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  // on mobile devices only mobile responsive navbar is shown (using css property display : none)
  chatApp = () => {
    if (this.state.data.length >0) {
      return (
        <div className={classes.chatComponent}>
          <div
            className={
              this.state.showSidebar
                ? `${classes.sidebar} ${classes.sidebarPhoneDisplay}`
                : `${classes.sidebar} ${classes.sidebarPhoneNone}`
            }
          >
            {this.mobileResponsiveNavbar()}

            <Sidebar
              data={this.state.data}
              selectChat={this.selectChat}
              selectedChat={this.state.selectedChat}
              inputChangedHandler={this.inputChangedHandler}
              newContact={this.state.newContact}
              addNewContact={() =>
                addNewContact(
                  this.state.newContact,
                  this.state.data,
                  sendPutRequest,
                  this.checkRequestStatusUpdateState
                )
              }
              errorAddingContact={this.state.errorAddingContact}
              resetError={this.resetError}
              errorType={constants.errorAddingContact}
            />
          </div>
          <div
            className={
              this.state.showSidebar
                ? `${classes.messagingSection} ${classes.messagingSectionPhoneNone}`
                : `${classes.messagingSection} ${classes.messagingSectionPhoneDisplay}`
            }
          >
            <Navbar
              navigateTo={constants.navigateToMyProfile}
              chatWith={
                Object.keys(this.state.data[this.state.selectedChat])[0]
              }
              showSidebarProperty={this.state.showSidebar}
              showSidebarFunction={this.showSidebarFunction}
            />
            <div className={classes.messagingSectionMessages}>
              {createMessagingSection(this.state.data, this.state.selectedChat)}
              <div
                ref={(el) => {
                  this.messagesEnd = el;
                }}
              >
                {" "}
              </div>
            </div>
            <ErrorMessage
              error={this.state.errorSendingMessage}
              resetError={this.resetError}
              errorType={constants.errorSendingMessage}
            />
            <InputField
              inputChangedHandler={(event) =>
                this.inputChangedHandler(event, constants.newMessage)
              }
              sendMessage={() =>
                sendMessage(
                  this.state.newMessage,
                  this.state.errorSendingMessage,
                  this.state.data,
                  this.state.selectedChat,
                  sendPutRequest,
                  this.checkRequestStatusUpdateState
                )
              }
              newMessage={this.state.newMessage}
            />
          </div>
        </div>
      );
    }
  };

  mobileResponsiveNavbar = () => {
    return (
      <div className={classes.navbarOfSidbarForMobile}>
        <Navbar
          navigateTo={constants.navigateToMyProfile}
          chatWith={Object.keys(this.state.data[this.state.selectedChat])[0]}
          showSidebarProperty={this.state.showSidebar}
          showSidebarFunction={this.showSidebarFunction}
        />
      </div>
    );
  };

  render() {
    return (
      <div>
        {redirectTo(this.props.email, this.props.password, constants.navigateToHome)}
        {this.chatApp()}
        {createErrorMessage(this.state.errorLoadingChats)}
        {createSpinner(this.state.data, this.state.errorLoadingChats)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.email,
    password: state.password,
  };
};

export default connect(mapStateToProps)(Messenger);
