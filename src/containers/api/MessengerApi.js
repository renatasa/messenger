import axios from "axios";
import { constants } from "../Messenger/constants";

export const chatsDataGetRequest = (checkRequestStatusUpdateState) => {
  const useHeaders = {
    headers: {
      "secret-key": process.env.REACT_APP_API_KEY,
    },
  };
  axios
    .get(process.env.REACT_APP_GET_CHATS, useHeaders)
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
