import React, { Component } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Message from "../../components/Message/Message";
import InputField from "../../components/UI/ChatInputField/ChatInputField";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import Navbar from "../../components/Navbar/Navbar";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Messenger.module.css";

export class Messenger extends Component {
  // data - chatting data that is received from backend
  // by default, when first loads,
  // messenger displays first chat (received from backend data array) in Messaging section
  // therefore selectedChat by default is 0
  // newMessage - this is text that user types in input field
  // errorLoadingChats - HTTP GET request error
  // errorSendingMessage - HTTP POST request error

  state = {
    data: null,
    selectedChat: 0,
    newMessage: "",
    newContact: "",
    errorLoadingChats: null,
    errorSendingMessage: null,
    showSidebar: true,
    isMounted: false,
    isMounted: false
  };

  chatsDataGetRequest = () => {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        let dataUpdated = [];
        if (req.status == 200) {
          dataUpdated = [...JSON.parse(req.responseText)["data"]];
        }
        this.checkRequestStatusUpdateState(
          req,
          dataUpdated,
          "errorLoadingChats",
          "do not clear input"
        );
      }
    };

    req.open("GET", process.env.REACT_APP_GET_SIDEBAR_CHATS, true);
    req.setRequestHeader("secret-key", process.env.REACT_APP_API_KE);
    req.send();
  };

  sendPutRequest = (newData, clearInput) => {
    let newDataObj = {
      data: newData,
    };

    let newDataJson = JSON.stringify(newDataObj);
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        this.checkRequestStatusUpdateState(
          req,
          newData,
          "errorSendingMessage",
          clearInput
        );
      }
    };

    req.open("PUT", process.env.REACT_APP_GET_SIDEBAR_CHATS, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("versioning", "false");
    req.setRequestHeader("secret-key", process.env.REACT_APP_API_KEY);
    req.send(newDataJson);
  };

  // when component mounts,
  // componnetDidMount sends HTTP request to get
  // chatting data (contact names and chats) from backend,
  // chatting data is then saved as this.state.data.

  // this.sendContinuousRequestsUpdateChats function is used for updating this.state.data
  // and chat UI if there are any new messages sent by other users. It is set to execute every 2s.
  // this.sendContinuousRequestsUpdateChats is eliminated, when Messenger component unmounts.
  // currently this.sendContinuousRequestsUpdateChats  and componentWillUnmount are commented
  // to prevent exceeding amount of free requests of JSONbin.io
  componentDidMount() {
    this.setState({isMounted: true})
    this.chatsDataGetRequest();
    //  this.sendContinuousRequestsUpdateChats = setInterval(() => {
    //   this.chatsDataGetRequest();
    // }, 2000);
  }

  componentWillUnmount() {
  //  clearInterval(this.sendContinuousRequestsUpdateChats);
  this.setState({isMounted:false})
  }

  // scrolls to latest messages in chat
  // componentDidUpdate() {
  //   if(this.state.errorLoadingChats==""){
  //     this.scrollToBottom();
  //   }

  // }

  checkRequestStatusUpdateState = (req, newData, error, clearInput) => {
    // if request status !=200 , this.state.data does not update, this.state.error updates
    // when fetching data from backend, emptying user's input fields in UI is undesirable
    // when sending new text message, we want to set this.state.newMessage=""
    // after new contact is added, we want to set this.state.newContact=""
    if (req.status !== 200) {
      this.setState({ [error]: JSON.parse(req.response).message });
    } else if (clearInput == "do not clear input") {
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

    // when this.state.showSidebar is false,
    // Sidebar is assigned CSS class with display: none property
    //this function hides sidebar on mobile devices
    this.hideSidebar();
  };

  // updates newMessage property in state object
  // when user starts typing new message into InputField
  inputChangedHandler = (event, inputName) => {
    event.preventDefault();
    this.setState({ [inputName]: event.target.value });
  };

  // function for creating timestamps that are used as
  // IDs for new nessages
  createTimeStamp = () => {
    let now = new Date();
    let timestamp = now.getFullYear().toString();
    timestamp += (now.getMonth < 9 ? "0" : "") + now.getMonth().toString() + 1; // JS months are 0-based
    timestamp += (now.getDate() < 10 ? "0" : "") + now.getDate().toString();
    timestamp += (now.getHours < 10 ? "0" : "") + now.getHours().toString();
    timestamp +=
      (now.getMinutes() < 10 ? "0" : "") + now.getMinutes().toString();
    timestamp +=
      (now.getSeconds() < 10 ? "0" : "") + now.getSeconds().toString();

    if (now.getMilliseconds() < 10) {
      timestamp += "00" + now.getMilliseconds().toString();
    } else if (now.getMilliseconds() < 100) {
      timestamp += "0" + now.getMilliseconds().toString();
    } else {
      timestamp += now.getMilliseconds().toString();
    }

    return timestamp;
  };

  //checks if this.state.newMessage is not empty, updates backend and UI
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

      this.sendPutRequest(newData, "newMessage");
    }
  };

  //checks if this.state.newContact is not empty, updates backend and UI
  addNewContact = () => {
    if (this.state.newContact !== "") {
      let newData = JSON.parse(JSON.stringify(this.state.data));
      let newContactData = { [this.state.newContact]: [] };
      newData.splice(0, 0, newContactData);
      this.sendPutRequest(newData, "newContact");
    }
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView();
  };

  resetError = () => {
    console.log("resetError");
    this.setState({ errorSendingMessage: null });
  };

  showSidebarFunction = () => {
    this.setState({ showSidebar: true });
  };

  hideSidebar = () => {
    this.setState({ showSidebar: false });
  };

  render() {
    // in the Sidebar, messenger contacts are being displayed
    // Sidebar is on the left of the page.
    // Messaging section (that contains chat with selected contact)
    // is being displayed on the right side of the page

    console.log(this.state.errorSendingMessage);

    let messagingSection = [];

    if (this.state.data !== null) {
      let chat = [
        ...Object.values(this.state.data[this.state.selectedChat])[0],
      ];
      chat.map((chatItem, index) =>
        messagingSection.push(
          <Message
            author={chatItem.author}
            messageText={chatItem.messageText}
            key={index}
          />
        )
      );
    }

    let chat = null;

    // user logs in by providing email and password
    // if user tries to access Messenger component
    // without logging in first,
    // user is being redirected to LoginForm component

    let redirectToLogin = null;
    if (!this.props.email || !this.props.password) {
      redirectToLogin = <Redirect to="/" />;
    }

    // If chats data is fetched from backend into state,
    // messenger componnet displays chats.
    // <div ref={(el) => {this.messagesEnd = el; }}  ></div> - this is a dummy div which is used for scrolling down to the end of chat

    let scrollToDiv = null;

    if (this.state.isMounted) {
      scrollToDiv = (
        <div
          ref={(el) => {
            this.messagesEnd = el;
          }}
        ></div>
      );
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
              <div className={`${classes.messagingSectionMessages} `}>
                {messagingSection}
                {scrollToDiv}
                <ErrorMessage
                  error={this.state.errorSendingMessage}
                  resetError={this.resetError}
                  errorType={"errorSendingMessage"}
                />
              </div>
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

    // if chats data is not yet fetched from backend into state,
    // messenger componnet displays spinner
    if (this.state.data == null && !this.state.errorLoadingChats) {
      chat = <Spinner />;
    }

    // if chats data was not fetched from backend into state
    // (server responded with status code which is not 200)
    // messenger componnet displays Error message
    if (this.state.errorLoadingChats) {
      chat = (
        <div>
          <Navbar navigateTo={"/myProfile"} showSidebarProperty={true} />
          <div className={classes.loadingChatsError}>
            {" "}
            <ErrorMessage
              error={this.state.errorLoadingChats}
              errorType={"errorLoadingChats"}
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        {redirectToLogin}
        {chat}
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
