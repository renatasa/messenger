import React, { Component } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Message from "../../components/Message/Message";
import InputField from "../../components/UI/ChatInputField/ChatInputField";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import Navbar from "../../components/Navbar/Navbar";
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import classes from "./Messenger.module.css";

export class Messenger extends Component {
  // data - chatting data that is received from backend
  // by default, when first loads,
  // messenger displays first chat (received from backend data array) in Messaging section
  // therefore selectedChat by default is 0
  // newMessage - this is text that user types in input field
  // error - HTTP request error

    // or super(props) ?

    state = {
      data: [],
      selectedChat: 0,
      newMessage: null,
      error: null,
    };
  
 

  // when component mounts,
  // componnetDidMount sends HTTP request to get
  // chatting data (contact names and chats) from backend,
  // chatting data is then saved as state object
  componentDidMount() {

    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        let dataUpdated = [];
        if (req.status == 200) {
          dataUpdated = [...JSON.parse(req.responseText)["data"]];
        }
        this.checkRequestStatusUpdateState(req, dataUpdated);
      }
    };

    req.open("GET", process.env.REACT_APP_GET_SIDEBAR_CHATS, true);
    req.setRequestHeader(
      "secret-key",
      "$2b$10$L4eDTWs0EhRwLDrvJBmSOOZsCgkL103QHaarkuvKEzURiZrOyqA.y"
    );
    req.send();
  }

  checkRequestStatusUpdateState = (req, newData) => {
    if (req.status !== 200) {
      this.setState({ error: JSON.parse(req.response).message });
    } else {
      this.setState({
        data: newData,
        newMessage: "",
        error: null,
      });
    }
  };
  // when user clicks on a contact name in the Sidebar,
  // selectChat function updates selectedChat property in state
  // therefore, messagingSection array
  // updates and displays chat with selected user
  selectChat = (index) => {
    this.setState({ selectedChat: index });
  };

  // updates newMessage property in state object
  // when user starts typing new message into InputField
  inputChangedHandler = (event) => {
    event.preventDefault();
    this.setState({ newMessage: event.target.value });
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

  //checks if newMessage is not empty, updates backend and UI
  sendMessage = () => {
    if (this.state.newMessage && !this.state.error) {
      let timestamp = this.createTimeStamp();
      let newMessageObj = {
        messageText: this.state.newMessage,
        author: "me",
        date: timestamp,
      };
      let newData = [];

      //deeply copying and updating state data
      for (let i = 0; i < this.state.data.length; i++) {
        let deepCopy = [];
        let updatedPerson = {};

        for (let z = 0; z < Object.values(this.state.data[i])[0].length; z++) {
          deepCopy.push(Object.values(this.state.data[i])[0][z]);
        }

        if (i == this.state.selectedChat) {
          deepCopy.push(newMessageObj);
        }

        let person = Object.keys(this.state.data[i])[0];
        updatedPerson = {
          [person]: deepCopy,
        };
        newData.push(updatedPerson);
      }

      let newDataObj = {
        data: newData,
      };

      let newDataJson = JSON.stringify(newDataObj);

      let req = new XMLHttpRequest();

      req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
          this.checkRequestStatusUpdateState(req, newData);
        }
      };

      req.open("PUT", process.env.REACT_APP_GET_SIDEBAR_CHATS, true);
      req.setRequestHeader("Content-Type", "application/json");
      req.setRequestHeader("versioning", "false");
      req.setRequestHeader(
        "secret-key",
        "$2b$10$L4eDTWs0EhRwLDrvJBmSOOZsCgkL103QHaarkuvKEzURiZrOyqA.y"
      );
      req.send(newDataJson);
    }
  };

  resetError = () => {
    this.setState({ error: null });
  };

  render() {

    // in thes isdebar messenger contacts are being displayed
    // sidebar is on the left of the page.
    // messaging section (that contains chat with selected contact)
    // is being displayed on the right side of the page

    let messagingSection = [];

    if (this.state.data.length > 0) {
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

    if(!this.props.email || !this.props.password){
      chat=<Redirect to="/"/>
    }else if (this.state.data.length > 0) {
      chat = (
        <div>
        <div className={classes.chatComponent}>
          
          <div className={classes.sidebar}>
            <Sidebar data={this.state.data} selectChat={this.selectChat} />
          </div>

      
           <div className={classes.messagingSection}> 
           <Navbar/>
           <div className={classes.messagingSectionMessages}>{messagingSection}</div>
            <InputField
              inputChangedHandler={this.inputChangedHandler}
              sendMessage={this.sendMessage}
            />
             </div>
       
          </div>
          <ErrorMessage
            error={this.state.error}
            resetError={this.resetError}
            errorType={"error"}
          />
        </div>
      );
    } else if (this.state.data.length == 0 && !this.state.error) {
      chat = <Spinner />;
    } else if (this.state.data.length == 0 && this.state.error) {
      chat = (
        <ErrorMessage
          error={this.state.error}
          resetError={this.resetError}
          errorType={"error"}
        />
      );
    }

    return <div >{chat}</div>;
  }
}

const mapStateToProps=state=>{
  return{
      email: state.email, 
      password: state.password
  }
}

export default connect(mapStateToProps)(Messenger);

