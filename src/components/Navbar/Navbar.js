import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom'
import classes from "./Navbar.module.css";

export const navbar = (props) => {
  // navbar component is used in Messenger and in MyProfile components
  // from navbar in messenger user can navigate to MyProfile
  // from nabar in MyProfile user can navigate to messenger
  // navbar updates its UI when it receives navigateTo prop

  let navContent=null;
  if(props.navigateTo=='myProfile'){
    navContent=<NavLink to="/myprofile"><FontAwesomeIcon icon={faUser}/></NavLink>
  }

  if(props.navigateTo=='messenger'){
    navContent=<NavLink to="/messenger"><FontAwesomeIcon icon={faComments} onClick={props.goToMessenger}/></NavLink>
  }

  return (
    <div className={props.navigateTo=="messenger" ? `${classes.navbar} ${classes.navbarMyProfile}` : classes.navbar }>
            <div className={`${classes.myProfile} ${classes.button}`}>{navContent}</div>
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