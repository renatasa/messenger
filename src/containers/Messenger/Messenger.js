import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import classes from './Messenger.module.css';

export class Messenger extends Component {
    state={
        data: []
    }

    //when component mounts, 
    //sends HTTP request to get chatting data (contact names and chats) 
    //from backend, saves chatting data in state object
    componentDidMount(){
        let req = new XMLHttpRequest();

        req.onreadystatechange = () => {
          if (req.readyState == XMLHttpRequest.DONE) {
            let dataUpdated=[...((JSON.parse(req.responseText))['data'])];
            this.setState({data:dataUpdated});
          }
        };
        
        req.open("GET", process.env.REACT_APP_GET_SIDEBAR_CHATS, true);
        req.setRequestHeader("secret-key", process.env.REACT_APP_API_KEY);
        req.send();    
    }

  render() {
    //messenger contacts are being displayed in the sidebar 
    //on the left of the page
    return (
                <div>
                        <div className={classes.sidebar}>
                                        <Sidebar data={this.state.data}/>
                        </div>

                        <div className={classes.messagingSection}>
                                        Messaging section
                        </div>

                </div> 
    )
  }
}

export default Messenger;