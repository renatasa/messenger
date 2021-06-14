import React, { Component } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import InputField from "../../components/UI/ChatInputField/ChatInputField";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { connect } from "react-redux";
import classes from "./Messenger.module.css";
import {
  createMessagingSection,
  createErrorMessage,
  createSpinner,
  addNewContact,
  sendMessage,
  redirectToLogin
} from "./service";
import { chatsDataGetRequest } from "../api/messengerApi";
import { constants } from "./constants";

export class Messenger extends Component {
  // data - chatting data that is received from backend
  // by default, when first loads,
  // messenger displays first chat (received from backend data array) in Messaging section
  // therefore selectedChat by default is 0
  // newMessage - this is text that user types in input field
  // newContact - text that user types in Sidebar input field when adding new contact
  // errorLoadingChats - HTTP GET request error
  // errorSendingMessage - HTTP POST request error
  // errorAddingContact - HTTP POST request error
  // errorSendingMessage and errorAddingContact differ in css
  // showSidebar - used in mobile responsie devices, when switching between sidebar view and chat view

  state = {
    data: null,
    selectedChat: 0,
    newMessage: "",
    newContact: "",
    errorLoadingChats: null,
    errorSendingMessage: null,
    errorAddingContact: null,
    showSidebar: true,
  };

  sendPutRequest = (newData, clearInput, updateError) => {
    const newDataObj = {
      data: newData,
    };

    const newDataJson = JSON.stringify(newDataObj);

    const useHeaders = {
      headers: {
        "secret-key": process.env.REACT_APP_API_KEY,
        "Content-Type": "application/json",
        versioning: "false",
      },
    };

    axios
      .put(process.env.REACT_APP_GET_CHATS, newDataJson, useHeaders)
      .then((response) => {
        this.checkRequestStatusUpdateState(
          response,
          newData,
          updateError,
          clearInput
        );
      })

      .catch((error) => {
        console.log(error);
        this.checkRequestStatusUpdateState(
          error.response,
          null,
          updateError,
          clearInput
        );
      });
  };

  // this.sendContinuousRequestsUpdateChats function is used for updating this.state.data
  // and chat UI if there are any new messages sent by other users. It is set to execute every 2s.
  // this.sendContinuousRequestsUpdateChats is eliminated, when Messenger component unmounts.
  // currently this.sendContinuousRequestsUpdateChats  and componentWillUnmount are commented
  // to prevent exceeding amount of free requests of JSONbin.io
  componentDidMount() {
    if (this.props.email !== null && this.props.password !== null) {
      chatsDataGetRequest(this.checkRequestStatusUpdateState);
    }
    //  this.sendContinuousRequestsUpdateChats = setInterval(() => {
    //   this.chatsDataGetRequest();
    // }, 2000);
  }

  componentDidUpdate() {
    if (
      this.props.email !== null &&
      this.props.password !== null &&
      this.state.data
    ) {
      this.scrollToBottom();
    }
  }

  componentWillUnmount() {
    //  clearInterval(this.sendContinuousRequestsUpdateChats);
  }

  checkRequestStatusUpdateState = (req, newData, error, clearInput) => {
    // if request status !=200 , this.state.data does not update, one of error properties in state updates
    // when fetching data from backend, emptying user's input fields in UI is undesirable, therefore it is not updated with setState
    // when sending new text message, we want to clear input field after successful request (set this.state.newMessage="")
    // after new contact is added, we want to  clear input field after successful request (set this.state.newContact="")
    if (req.status !== 200) {
      this.setState({ [error]: req["data"]["message"] });
      // this.setState({ [error]: JSON.parse(req.response).message });
    } else if (clearInput === constants.doNotClearInput) {
      this.setState({
        data: newData,
        [error]: null,
      });
    } else {
      this.setState({
        data: newData,
        [clearInput]: constants.emptyString,
        [error]: null,
      });
    }
  };

  // when user clicks on a contact name in the Sidebar,
  // selectChat function updates selectedChat property in state
  // therefore, messagingSection array
  // updates and displays chat with selected user
  selectChat = (index) => {
    this.setState({ selectedChat: index });

    // following function hides sidebar on mobile devices
    // when this.state.showSidebar is false,
    // Sidebar is assigned CSS class with display: none property
    this.hideSidebar();
  };

  // updates newMessage property in state object
  // when user starts typing new message or adding new contact into textarea or input field
  inputChangedHandler = (event, inputName) => {
    event.preventDefault();
    this.setState({ [inputName]: event.target.value });
  };

  resetError = (errorType) => {
    this.setState({ [errorType]: null });
  };

  // showSidebarFunction and hideSidebar are used in mobile devices for switching
  // between sidebar view and chat view
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
    if (this.state.data !== null) {
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
                  this.sendPutRequest
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
                  this.sendPutRequest
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
        {redirectToLogin(this.props.email, this.props.password)}
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
