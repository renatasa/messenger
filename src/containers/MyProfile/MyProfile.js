import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import ProfileDetails from "../../components/UI/ProfileDetails/ProfileDetails";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
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

  updatedDetailsInState = (updatedDetail, index) => {
    let updatedDetails = [];
    updatedDetails = [...this.state.details];
    updatedDetails[index] = updatedDetail;
    this.setState({ details: updatedDetails });
  };

  // updates user details
  inputChangedHandler = (e, index) => {
    e.preventDefault();
    let updatedDetail = [];

    if (e.target.value.length > 20) {
      updatedDetail = [...this.state.details[index]];
      updatedDetail[2] = true;
      this.updatedDetailsInState(updatedDetail, index);
    } else {
      console.log(e.target.value);
      updatedDetail.push(this.state.details[index][0]);
      updatedDetail.push(e.target.value);
      updatedDetail.push(false);
      this.updatedDetailsInState(updatedDetail, index);
    }
  };

  render() {
    // when user clicks chats icon in navbar
    // he is redirected to Messenger component
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

    myProfileDetails = this.state.details.map((detail, index) => (
      <ProfileDetails
        label={detail[0]}
        details={detail[1]}
        inputChangedHandler={this.inputChangedHandler}
        index={index}
        error={detail[2]}
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
