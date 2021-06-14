import Message from "../../components/Message/Message";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Spinner from "../../components/Spinner/Spinner";
import Navbar from "../../components/Navbar/Navbar";
import { constants } from "./constants";
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

export const createSpinner = (data, errorLoadingChats) => {
  if (data === null && !errorLoadingChats) {
    return <Spinner />;
  }
};

export const sendMessage = (
  newMessage,
  errorSendingMessage,
  data,
  selectedChat,
  sendPutRequest,
  checkRequestStatusUpdateState
) => {
  if (newMessage && !errorSendingMessage) {
    const newMessageObj = {
      messageText: newMessage,
      author: constants.meAsAuthorOfMessage,
    };

    const newData = JSON.parse(JSON.stringify(data));
    const contactName = Object.keys(data[selectedChat]);
    newData[selectedChat][contactName].push(newMessageObj);
    console.log("service file");
    sendPutRequest(
      newData,
      constants.newMessage,
      constants.errorSendingMessage, 
      checkRequestStatusUpdateState
    );
  }
};

export const addNewContact = (newContact, data, sendPutRequest, checkRequestStatusUpdateState) => {
  if (newContact !== constants.emptyString) {
    const newData = JSON.parse(JSON.stringify(data));
    const newContactData = { [newContact]: [] };
    newData.splice(0, 0, newContactData);
    sendPutRequest(newData, constants.newContact, constants.errorAddingContact, checkRequestStatusUpdateState);
  }
};

