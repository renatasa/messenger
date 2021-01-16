// submits what is in input field when user presses ENTER
export const handleUserKeyPress =(e, callback)=> {
  
    if (e.key === "Enter" && !e.shiftKey) {
      callback();
     }
   
    
};

export default handleUserKeyPress