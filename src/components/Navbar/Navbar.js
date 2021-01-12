import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import classes from "./Navbar.module.css";

export const navbar = (props) => {

  return (
    <div className={classes.navbar}>
            <div className={`${classes.myProfile} ${classes.button}`}>My profile</div>
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