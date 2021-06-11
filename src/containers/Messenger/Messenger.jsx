import React, { Component } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import InputField from "../../components/UI/ChatInputField/ChatInputField";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Messenger.module.css";
import {
  createMessagingSection,
  createErrorMessage,
  createSpinner,
} from "./service";

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

  chatsDataGetRequest = () => {
    let useHeaders = {
      headers: {
        "secret-key": process.env.REACT_APP_API_KEY,
      },
    };
    axios
      .get(process.env.REACT_APP_GET_CHATS, useHeaders)
      .then((response) => {
        let dataUpdated = [];
        dataUpdated = JSON.parse(JSON.stringify(response.data["data"]));

        this.checkRequestStatusUpdateState(
          response,
          dataUpdated,
          "errorLoadingChats",
          "do not clear input"
        );
      })
      .catch((error) => {
        this.checkRequestStatusUpdateState(
          error.response,
          null,
          "errorLoadingChats",
          "do not clear input"
        );
      });
  };

  sendPutRequest = (newData, clearInput, updateError) => {
    let newDataObj = {
      data: newData,
    };

    let newDataJson = JSON.stringify(newDataObj);

    let useHeaders = {
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
      this.chatsDataGetRequest();
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
    } else if (clearInput === "do not clear input") {
      this.setState({
        data: newData,
        [error]: null,
      });
    } else {
      this.setState({
        data: newData,
        [clearInput]: "",
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

  //checks if this.state.newMessage is not empty, sends HTTP reqiest, updates backend and UI
  sendMessage = () => {
    if (this.state.newMessage && !this.state.errorSendingMessage) {
      let timestamp = this.createTimeStamp();
      let newMessageObj = {
        messageText: this.state.newMessage,
        author: "me",
        date: timestamp,
      };

      let newData = JSON.parse(JSON.stringify(this.state.data));
      let contactName = Object.keys(this.state.data[this.state.selectedChat]);
      newData[this.state.selectedChat][contactName].push(newMessageObj);

      this.sendPutRequest(newData, "newMessage", "errorSendingMessage");
    }
  };

  //checks if this.state.newContact is not empty, updates backend and UI
  addNewContact = () => {
    if (this.state.newContact !== "") {
      let newData = JSON.parse(JSON.stringify(this.state.data));
      let newContactData = { [this.state.newContact]: [] };
      newData.splice(0, 0, newContactData);
      this.sendPutRequest(newData, "newContact", "errorAddingContact");
    }
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

  render() {
    // in the Sidebar, messenger contacts are being displayed
    // Sidebar is on the left of the page.
    // Messaging section (that contains chat with selected contact)
    // is being displayed on the right side of the page

    const messagingSection = createMessagingSection(
      this.state.data,
      this.state.selectedChat
    );

    let chat = null;
    // user logs in by providing email and password
    // if user tries to access Messenger component
    // without logging in first,
    // user is being redirected to LoginForm component

    let redirectToLogin = null;
    if (!this.props.email || !this.props.password) {
      redirectToLogin = <Redirect to="/" />;
    }

    if (this.state.data !== null) {
      chat = (
        <div>
          <div className={classes.chatComponent}>
            <div
              className={
                this.state.showSidebar
                  ? `${classes.sidebar} ${classes.sidebarPhoneDisplay}`
                  : `${classes.sidebar} ${classes.sidebarPhoneNone}`
              }
            >
              <div className={classes.navbarOfSidbarForMobile}>
                <Navbar
                  navigateTo={"/myProfile"}
                  chatWith={
                    Object.keys(this.state.data[this.state.selectedChat])[0]
                  }
                  showSidebarProperty={this.state.showSidebar}
                  showSidebarFunction={this.showSidebarFunction}
                />
              </div>
              <Sidebar
                data={this.state.data}
                selectChat={this.selectChat}
                selectedChat={this.state.selectedChat}
                inputChangedHandler={this.inputChangedHandler}
                newContact={this.state.newContact}
                addNewContact={this.addNewContact}
                errorAddingContact={this.state.errorAddingContact}
                resetError={this.resetError}
                errorType={"errorAddingContact"}
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
                navigateTo={"/myProfile"}
                chatWith={
                  Object.keys(this.state.data[this.state.selectedChat])[0]
                }
                showSidebarProperty={this.state.showSidebar}
                showSidebarFunction={this.showSidebarFunction}
              />
              <div className={classes.messagingSectionMessages}>
                {createMessagingSection(
                  this.state.data,
                  this.state.selectedChat
                )}
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
                errorType={"errorSendingMessage"}
              />
              <InputField
                inputChangedHandler={(event) =>
                  this.inputChangedHandler(event, "newMessage")
                }
                sendMessage={this.sendMessage}
                newMessage={this.state.newMessage}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        {redirectToLogin}
        {chat}
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
