import axios from "axios";
import { constants } from "../Messenger/constants";

export const chatsDataGetRequest = (checkRequestStatusUpdateState) => {
  const useHeaders = {
    headers: {
      "secret-key": process.env.REACT_APP_API_KEY,
    },
  };
  return axios
    .get('https://api.jsonbin.io/b/60c70d9898ca6c704eaf60d0z', useHeaders)
    .then((response) => {
      const dataUpdated = JSON.parse(JSON.stringify(response.data["data"]));

      checkRequestStatusUpdateState(
        response,
        dataUpdated,
        constants.errorLoadingChats,
        constants.doNotClearInput
      );
    })
    .catch((error) => {
      checkRequestStatusUpdateState(
        error.response,
        null,
        constants.errorLoadingChats,
        constants.doNotClearInput
      );
    });
};

export const sendPutRequest = (
  newData,
  clearInput,
  updateError,
  checkRequestStatusUpdateState
) => {
  const newDataObj = {
    data: newData,
  };

  const newDataJson = JSON.stringify(newDataObj);

  const useHeaders = {
    headers: {
      "secret-key": process.env.REACT_APP_API_KEY,
      "Content-Type": "application/json",
      versioning: "false",
    },
  };

  return axios
    .put(process.env.REACT_APP_GET_CHATS, newDataJson, useHeaders)
    .then((response) => {
      checkRequestStatusUpdateState(response, newData, updateError, clearInput);
    })

    .catch((error) => {
      checkRequestStatusUpdateState(
        error.response,
        null,
        updateError,
        clearInput
      );
    });
};
