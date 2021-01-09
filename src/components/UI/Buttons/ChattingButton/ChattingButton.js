import React from 'react' ;
import classes from './ChattingButton.module.css';

export const chattingButton=(props)=> {
    
    // this is a button for sending text message to chat

        return <button 
                        className={classes.chattingButton} 
                        onClick={props.sendMessage}>+</button>
}

export default chattingButton ;