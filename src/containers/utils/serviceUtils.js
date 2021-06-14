
  import { Redirect } from "react-router-dom";
  
  export const redirectTo = (email, password, navigateTo) => {
    if (!email || !password) {
      return <Redirect to={navigateTo} />;
    }
  };