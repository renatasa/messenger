import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Message from '../../components/Message/Message';
import InputField from '../../components/UI/ChatInputField/ChatInputField';
import classes from './Messenger.module.css';

export class Messenger extends Component {
  // data - chatting data that is received from backend
  // by default, when first loads, 
  // messenger displays first chat (received from backend data array) in Messaging section  
  // therefore selectedChat by default is 0
  state={
        data: [],
        selectedChat: 0, 
        newMessage: null
    }

    // when component mounts, 
    // componnetDidMount sends HTTP request to get 
    // chatting data (contact names and chats) from backend, 
    // chatting data is then saved as state object
    componentDidMount(){
      let req = new XMLHttpRequest();

          req.onreadystatechange = () => {
              if (req.readyState == XMLHttpRequest.DONE) {
              if (req.readyState == XMLHttpRequest.DONE) {
                let dataUpdated=[...((JSON.parse(req.responseText))['data'])];
                this.setState({data:dataUpdated});
              }
          }
        };

        req.open("GET", process.env.REACT_APP_GET_SIDEBAR_CHATS , true);
        req.setRequestHeader("secret-key", process.env.REACT_APP_API_KEY);
      //  req.send();
      
      }
    // when user clicks on a contact name in the Sidebar,
    // selectChat function updates selectedChat property in state
    // therefore, messagingSection array 
    // updates and displays chat with selected user
    selectChat=(index)=>{
      console.log('selectChat');
      this.setState({selectedChat: index})
    }

    // updates newMessage property in state object
    // when user starts typing new message into InputField
    inputChangedHandler = (event) =>{
      event.preventDefault();
      this.setState({newMessage: event.target.value})

  }

  render() {
    // in thes isdebar messenger contacts are being displayed
    // sidebar is on the left of the page.
    // messaging section (that contains chat with selected contact) 
    // is being displayed on the right side of the page

   let messagingSection = [] ;

   if(this.state.data.length>0) { 
     let chat = [...Object.values(this.state.data[this.state.selectedChat])[0] ]
     chat.map((chatItem, index)=> messagingSection.push(
                          <Message 
                                  author={chatItem.author} 
                                  messageText={chatItem.messageText}
                                  key={index}
                                          />))
   }


    return (
                <div className={classes.chatComponent}>
                        <div className={classes.sidebar}>
                                        <Sidebar 
                                                data={this.state.data}
                                                selectChat={this.selectChat}/>
                        </div>

                        <div className={classes.messagingSection}>
                                        {messagingSection}
                                        <InputField inputChangedHandler={this.inputChangedHandler}/>
                        </div>
                       

                </div> 
    )
  }
}

export default Messenger;