import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom'
import classes from "./Navbar.module.css";

export const navbar = (props) => {
  // navbar component is used in Messenger and in MyProfile components
  // from navbar in messenger user can navigate to MyProfile
  // from nabar in MyProfile user can navigate to messenger
  // navbar updates its UI when it receives navigateTo prop

  let navButtonForMobileDevice=null;
  // chatWith - name of contact that user is currently chatting with 
  // is displayed in Messenger component NavBar
  let chatWith=null;
  let chooseIcon =null;

  if(props.navigateTo=='/myProfile'){
    chooseIcon = faUser 
    if(props.showSidebarProperty){
      navButtonForMobileDevice=null;
    }else{
      navButtonForMobileDevice=<div className={classes.showButton} onClick={props.showSidebarFunction}><FontAwesomeIcon icon={faBook}/></div>
    }
    chatWith=<div className={classes.chatWith}>{props.chatWith}</div>
  }

  if(props.navigateTo=='/messenger'){
    chooseIcon=faComments
  }

  return (
    <div className={props.navigateTo=="/messenger" ? `${classes.navbar} ${classes.navbarMyProfile}` : classes.navbar }>
      {chatWith}
      {navButtonForMobileDevice}
      <NavLink to={props.navigateTo}><div className={`${classes.myProfile} ${classes.button}`}><FontAwesomeIcon icon={chooseIcon}/></div></NavLink>
            <div ><FontAwesomeIcon icon={faSignOutAlt} className={`${classes.logout} ${classes.button}`} onClick={props.onLogout}/></div>
   </div>
  );
};


const mapDispatchToProps=dispatch=>{
  return{
      onLogout: ()=>dispatch(actions.logout())
  }
}

export default connect(null, mapDispatchToProps)(navbar);