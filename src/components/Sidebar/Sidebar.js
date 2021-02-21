import React from "react";
import SidebarItem from "../UI/SidebarItem/SidebarItem";
import SidebarInputField from "../UI/SidebarInputField/SidebarInputField";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export const sidebar = (props) => {
  // sidebar stateless component gets chatting data (as a prop)
  // from Messenger stateful component,
  // extracts contact names and uses SidebarItem stateless component to
  // display contact names in Sidebar on the left of the page

  let chats = [];
  let thisIsSelectedChat = false;
  if (props.data.length > 0) {
    for (let i = 0; i < props.data.length; i++) {
      if (props.selectedChat === i) {
        thisIsSelectedChat = true;
      }
      chats.push(
        <SidebarItem
          key={i}
          index={i}
          contactName={Object.keys(props.data[i])[0]}
          selectChat={props.selectChat}
          selectedChat={thisIsSelectedChat}
        />
      );
      thisIsSelectedChat = false;
    }
  }

  return (
    <div>
      <ErrorMessage
        error={props.errorAddingContact}
        resetError={props.resetError}
        errorType={"errorAddingContact"}
      />
      <SidebarInputField
        inputChangedHandler={props.inputChangedHandler}
        newContact={props.newContact}
        addNewContact={props.addNewContact}
      />
      {chats}
    </div>
  );
};

export default sidebar;
