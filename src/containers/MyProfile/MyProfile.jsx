import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import ProfileDetails from "../../components/UI/ProfileDetails/ProfileDetails";
import { redirectToLogin, createMyProfileDetails } from "./service";
import { constants } from "./constants";
import classes from "./MyProfile.module.css";

// const constants = {
//   fullName: "Full Name",
//   phoneNumber: "Phone Number",
//   location: "Location",
//   education: "Eucation",
//   jobs: "Jobs",
//   isNotValid: false,
//   navigateToHome: "/",
//   navigateToMessenger: "/messenger",
// };

// third element in each nested array indicates if length of second element is too large and if true, then shows error message
const mockProfileDetails = [
  [constants.fullName, "John Doe", constants.isNotValid],
  [constants.phoneNumber, "1234567", constants.isNotValid],
  [constants.location, "Lithuania", constants.isNotValid],
  [constants.education, "self tought", constants.isNotValid],
  [constants.jobs, "developer", constants.isNotValid],
];

export class MyProfile extends Component {
  state = {
    details: mockProfileDetails,
  };

  updatedDetailsInState = (updatedDetail, index) => {
    const updatedDetails = [...this.state.details];
    updatedDetails[index] = updatedDetail;
    this.setState({ details: updatedDetails });
  };

  inputChangedHandler = (e, index) => {
    e.preventDefault();
    let updatedDetail = [];
    if (e.target.value.length > 20) {
      updatedDetail = [...this.state.details[index]];
      updatedDetail[updatedDetail.length - 1] = true;
      this.updatedDetailsInState(updatedDetail, index);
    } else {
      updatedDetail.push(this.state.details[index][0]);
      updatedDetail.push(e.target.value);
      updatedDetail.push(false);
      this.updatedDetailsInState(updatedDetail, index);
    }
  };

  redirectToLogin = () => {
    if (!this.props.email || !this.props.password) {
      return <Redirect to={constants.navigateToHome} />;
    }
  };

  createMyProfileDetails = () => {
    return this.state.details.map((detail, index) => (
      <ProfileDetails
        label={detail[0]} // property name e.g. full name
        details={detail[1]} // property value e.g. John Doe
        inputChangedHandler={this.inputChangedHandler}
        index={index}
        error={detail[2]} // is property valid
        key={index}
      />
    ));
  };

  render() {
    return (
      <div>
        {redirectToLogin(this.props.email, this.props.password)}
        <Navbar navigateTo={constants.navigateToMessenger} />

        <div className={classes.myProfile}>
          <div className={classes.photoDiv}>
            <div className={classes.profilePhoto}>Photo</div>
            <div className={classes.editProfilePhoto}>Edit profile photo</div>
          </div>

          <div className={classes.info}>
            <div className={classes.shortInfo}>
              {createMyProfileDetails(this.state.details, this.inputChangedHandler)}
            </div>
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
