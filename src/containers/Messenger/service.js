import Message from "../../components/Message/Message";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import Navbar from "../../components/Navbar/Navbar";
import classes from "./Messenger.module.css";

export const createMessagingSection = (data, selectedChat) => {
  const messagingSection = [];
  if (data !== null) {
    const chat = [...Object.values(data[selectedChat])[0]];
    chat.map((chatItem, index) =>
      messagingSection.push(
        <Message
          author={chatItem.author}
          messageText={chatItem.messageText}
          key={index}
        />
      )
    );
  }
  return messagingSection;
};

export const createErrorMessage = (errorLoadingChats) => {
  if (errorLoadingChats) {
    return (
      <div>
        <Navbar navigateTo={"/myProfile"} showSidebarProperty={true} />
        <div className={classes.loadingChatsError}>
          {" "}
          <ErrorMessage
            error={errorLoadingChats}
            errorType={"errorLoadingChats"}
          />
        </div>
      </div>
    );
  } 
};

export const createSpinner=(data, errorLoadingChats)=>{
    if (data === null && !errorLoadingChats) {
        return <Spinner />;
      }
}
