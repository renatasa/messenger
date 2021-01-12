import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from "react-router-dom";
import classes from "./Navbar.module.css";

export const navbar = (props) => {
  // redirectToLogin=()=>{
  //   <Redirect to={"/"} />;
  // }
  

  return (
    <div className={classes.navbar}>
            <div className={classes.myProfile}>My profile</div>
            <div ><FontAwesomeIcon icon={faSignOutAlt} className={classes.logout} onClick={<Redirect to={"/"} />}/></div>
   </div>
  );
};

export default navbar;