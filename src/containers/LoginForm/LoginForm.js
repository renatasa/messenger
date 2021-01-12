import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import classes from "./LoginForm.module.css";

export class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    isValid: false,
    error: null,
  };

  inputChangedHandler = (event, inputName) => {
    event.preventDefault();
    this.setState({ [inputName]: event.target.value });
  };

  validateLoginData = () => {
    let isValid = true;

    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(this.state.email) && isValid;
    console.log("validateLogin ", isValid);

    if (this.state.password.length > 0) {
      isValid = true && isValid;
    }
    console.log("validate email ", isValid);

    if (isValid) {
      this.setState({ isValid: isValid });
    } else {
      this.setState({
        isValid: isValid,
        error: "Please enter email and password",
      });
    }
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.validateLoginData();
  };

  resetError = () => {
    this.setState({ error: null });
  };

  render() {
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
          onChange={(event) => this.inputChangedHandler(event, "password")}
        />
      </div>
    );

    let form = (
      <div className={classes.container}>
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
      </div>
    );

    let chatRedirect = null;

    if (this.state.isValid) {
      chatRedirect = <Redirect to={"/messenger"} />;
      console.log("suthredirect ");
    }

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

export default LoginForm;
