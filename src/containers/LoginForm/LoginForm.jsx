import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import handleUserKeyPress from "../../components/Utilities/UtilityFunction";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
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
    let isValid = false;

    if (this.state.email.length > 0 && this.state.password.length > 0) {
      isValid = true;
    }

    if (isValid) {
      this.props.onSetEmailPassword(this.state.email, this.state.password);
      this.setState({ isValid: isValid });
    } else {
      this.setState({
        isValid: isValid,
        error: "Please enter valid email and password",
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

  redirectToMessenger = () => {
    if (this.state.isValid) {
      //  this.props.onSetEmailPassword(this.state.email, this.state.password);
      return <Redirect to={"/messenger"} />;
    }
  };

  render() {
    return (
      <div className={classes.formContainer}>
        {this.redirectToMessenger()}
        <form className={classes.container}>
          <div>
            <div className={classes.formTitle}>Login</div>
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
                onChange={(event) =>
                  this.inputChangedHandler(event, "password")
                }
                onKeyPress={(event) =>
                  handleUserKeyPress(event, this.submitHandler)
                }
              />
            </div>
            <button
              className={classes.formButton}
              type="submit"
              onClick={this.submitHandler}
            >
              LOGIN
            </button>
          </div>
        </form>
        <ErrorMessage
          error={this.state.error}
          errorType={"warning"}
          resetError={this.resetError}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetEmailPassword: (email, password) =>
      dispatch(actions.setEmailPassword(email, password)),
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
