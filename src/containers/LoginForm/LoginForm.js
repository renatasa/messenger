import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import handleUserKeyPress from "../../components/Utilities/UtilityFunction";
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import classes from "./LoginForm.module.css";

export class LoginForm extends Component {
  //email - email that user puts in LoginForm
  // password - password that user puts in LoginForm
  //isValid - boolean which becomes true when email and password is longer than 1 character
  //error - error message which pops up when user tries to login without email and/or password
  state = {
    email: "",
    password: "",
    isValid: false,
    error: null,
  };

  // updates email and password when user types in input field
  inputChangedHandler = (event, inputName) => {
    event.preventDefault();
    this.setState({ [inputName]: event.target.value });
  };

  //checks if email and password are longer than 1 character
  validateLoginData = () => {
    let isValid = true;

    if (this.state.email.length > 0) {
      isValid = true && isValid;
    }

    if (this.state.password.length > 0) {
      isValid = true && isValid;
    }

    if (isValid) {
      this.setState({ isValid: isValid });
    } else {
      this.setState({
        isValid: isValid,
        error: "Please enter valid email and password",
      });
    }
  };

  //checks and submits email and password
  submitHandler = (event) => {
    event.preventDefault();
    this.validateLoginData();
  };

  resetError = () => {
    this.setState({ error: null });
  };

  render() {
    // inputs of Login form
    let inputs = (
      <div>
        <div>
          <input
            className={classes.formInput}
            type="email"
            placeholder="Mail Address"
            value={this.state.email}
            onChange={(event) => this.inputChangedHandler(event, "email")}
          />
        </div>

        <input
          className={classes.formInput}
          type="password"
          placeholder="Password"
          value={this.state.password}
          onKeyPress={handleUserKeyPress(this.validateLoginData)}
          onChange={(event) => this.inputChangedHandler(event, "password")}
        />
      </div>
    );

    // Login form itself
    let form = (
      <form className={classes.container}>
        <div>
          <div className={classes.formTitle}>Login</div>
          {inputs}
          <button
            className={classes.formButton}
            type="submit"
            onClick={this.submitHandler}
          >
            LOGIN
          </button>
        </div>
      </form>
    );

    let chatRedirect = null;

    if (this.state.isValid) {
      chatRedirect = <Redirect to={"/messenger"} />;
      //email and password are being saved in redux store
      //from redux store data will be passed to messenger component
      //messenger component will render only if email and password are not null, 
      //else, user will be redirected to login component
      //when user clicks logout, email and password will be set to null in redux store 
      //therefore user will be redirected to login form
      this.props.onSetEmailPassword(this.state.email, this.state.password);
    }

    // ErrorMessage - is visible only when user tries to login 
    // without providing email and password.
    // When this.state.error becomes not null or false,
    // this changes css class in ErrorMessage component
    // therefore, error message becomes visible with transition.
    // This error message dissapears in 2sec automatically, 
    // or user can turn it off by clicking X .
    return (
      <div className={classes.formContainer}>
        {chatRedirect}
        {form}
        <ErrorMessage
          error={this.state.error}
          errorType={"warning"}
          resetError={this.resetError}
        />
      </div>
      
    );
  }
}


const mapDispatchToProps=dispatch=>{
  return{
      onSetEmailPassword: (email, password)=>dispatch(actions.setEmailPassword(email, password))
  }
}

export default connect(null, mapDispatchToProps)(LoginForm);
