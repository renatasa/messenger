
// submits what is in input field when user presses ENTER
const handleUserKeyPress =(e, callback)=> {
  
    if (e.key === "Enter" && !e.shiftKey) {
      callback();
     }
   
    
};

export default handleUserKeyPress;