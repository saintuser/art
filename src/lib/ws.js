import ReconnectingWebsocket from "reconnecting-websocket";

import { useUser, randomId, config } from "./index.js";

// Websocket

export const socket = new ReconnectingWebsocket(config.wsUrl);

// Create message

export const createMessage = (message) => {
  const { userId, userName } = useUser();
  return JSON.stringify({
    id: randomId(),
    datetime: new Date().toISOString(),
    userId: userId.value,
    userName: userName.value,
    type: "",
    channel: "",
    value: "",
    ...message,
  });
};
