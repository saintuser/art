import ReconnectingWebsocket from "reconnecting-websocket";

import { useUser, randomId, config } from "./index.js";

// Websocket

export const ws = new ReconnectingWebsocket(config.wsUrl);

// Create message

export const createMessage = (message) => {
  const { userId } = useUser();
  return JSON.stringify({
    id: randomId(),
    datetime: new Date().toISOString(),
    userId: userId.value,
    type: "",
    channel: "",
    value: "",
    ...message,
  });
};
