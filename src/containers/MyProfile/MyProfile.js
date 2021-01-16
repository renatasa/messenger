import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import ProfileDetails from "../../components/UI/ProfileDetails/ProfileDetails";
import { connect } from "react-redux";
import classes from "./MyProfile.module.css";

export class MyProfile extends Component {
  // third element in array indicates if length of
  // second element in array is too large and shows error message
  // in Profile details component
  state = {
    goToMessenger: false,
    details: [
      ["Full Name", "John Doe", false],
      ["Phone Number", "1234567", false],
      ["Location", "Lithuania", false],
      ["Education", "self tought", false],
      ["Jobs", "developer", false],
    ],
  };

  redirectToMessenger = () => {
    this.setState({ goToMessenger: true });
  };

  // copies array of data of all input fields
  // updates with array of data of single selected input field
  // updates state. 
  // This function is being used in inputChangedHandler.
  updatedDetailsInState = (updatedDetail, index) => {
    let updatedDetails = [];
    updatedDetails = [...this.state.details];
    updatedDetails[index] = updatedDetail;
    this.setState({ details: updatedDetails });
  };

  // updates user details
  inputChangedHandler = (e, index) => {
    e.preventDefault();
    // creates new array for copying and updating data of single input field
    let updatedDetail = [];

    // in this case, 
    // user input is set to be not longer than 20 characters.
    // if user inputs more than 20 characters, this throws an error, which 
    // is shown near input field and dissapears
    // when user input becoms less than 20 characters
    if (e.target.value.length > 20) {
      // copies existing array of single input field data
      updatedDetail = [...this.state.details[index]];
      // assigns third value of array to true, 
      // this makes error message to appear
      updatedDetail[2] = true;
      // updates data of all input fields with newly updated data of single input field
      this.updatedDetailsInState(updatedDetail, index);
    } else {
      // copies and pushes name of single selected input field
      updatedDetail.push(this.state.details[index][0]);
      // pushes new value of selected input field
      updatedDetail.push(e.target.value);
      // third element of single input field array is false when 
      // input length is =<20 charactes, in this case no error is being thrown
      updatedDetail.push(false);
      this.updatedDetailsInState(updatedDetail, index);
    }
  };

  render() {
    // when user clicks chats icon in navbar
    // user is redirected to Messenger component
    let redirectToMessenger = null;
    if (this.state.goToMessenger == true) {
      redirectToMessenger = <Redirect to="/messenger" />;
    }

    // to access MyProfile component, user has to login first
    // if user tries to access MyProfile wihout logging in first,
    // he is redirected to LoginForm component
    let redirectToLogin = null;
    if (!this.props.email || !this.props.password) {
      redirectToLogin = <Redirect to="/" />;
    }

    let myProfileDetails = null;
// example of single profile details array - ["Full Name", "John Doe", false]
    myProfileDetails = this.state.details.map((detail, index) => (
      <ProfileDetails
        label={detail[0]} //example - Full Name 
        details={detail[1]} // example - John Doe
        inputChangedHandler={this.inputChangedHandler}
        index={index}
        error={detail[2]} // example - false
      />
    ));

    return (
      <div>
        {redirectToMessenger}
        {redirectToLogin}
        <Navbar
          goToMessenger={this.state.redirectToMessenger}
          navigateTo={"messenger"}
        />

        <div className={classes.myProfile}>
          <div className={classes.photoDiv}>
            <div className={classes.profilePhoto}>Photo</div>
            <div className={classes.editProfilePhoto}>Edit profile photo</div>
          </div>

          <div className={classes.info}>
            <div className={classes.shortInfo}>{myProfileDetails}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.email,
    password: state.password,
  };
};

export default connect(mapStateToProps)(MyProfile);
