import React from "react";
import SidebarItem from "../UI/SidebarItem/SidebarItem";

export const sidebar = (props) => {
  // sidebar stateless component gets chatting data (as a prop)
  // from Messenger stateful component,
  // extracts contact names and uses SidebarItem stateless component to
  // display contact names in Sidebar on the left of the page

  let chats = [];
  if (props.data.length > 0) {
    for (let i = 0; i < props.data.length; i++) {
      chats.push(
        <SidebarItem
          key={i}
          index={i}
          contactName={Object.keys(props.data[i])[0]}
          selectChat={props.selectChat}
        />
      );
    }
  }

  return <div>{chats}</div>;
};

export default sidebar;
