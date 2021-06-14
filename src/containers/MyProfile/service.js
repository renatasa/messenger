import ProfileDetails from "../../components/UI/ProfileDetails/ProfileDetails";

  export const createMyProfileDetails = (details, inputChangedHandler) => {
    return details.map((detail, index) => (
      <ProfileDetails
        label={detail[0]} // property name e.g. full name
        details={detail[1]} // property value e.g. John Doe
        inputChangedHandler={inputChangedHandler}
        index={index}
        error={detail[2]} // is property valid
        key={index}
      />
    ));
  };