import React from "react";
import classes from "./SidebarItem.module.css";

export const sidebarItem = (props) => {
  //sideBarItem stateles componnet
  //gets contact names as props from Sidebar component and displays them

  return (
    <div
      className={
        props.selectedChat
          ? `${classes.contactName} ${classes.selectedChat}`
          : classes.contactName
      }
      onClick={() => props.selectChat(props.index)}
    >
      {props.contactName}
    </div>
  );
};

export default sidebarItem;
