
  import { Redirect } from "react-router-dom";
  
  export const redirectTo = (email, password, navigateTo) => {
      console.log('navigator ', navigateTo)
    if (!email || !password) {
      return <Redirect to={navigateTo} />;
    }
  };