import ReconnectingWebsocket from "reconnecting-websocket";

import { ref } from "vue";
import { useUser, randomId, config, uniqueCollection } from ".";

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

export const messages = ref([]);

export const loadMessages = () => {
  fetch(config.historyUrl)
    .then((res) => res.json())
    .then(
      (loadedMessages) =>
        (messages.value = uniqueCollection(
          [...loadedMessages, ...messages.value],
          "id"
        ))
    );
};
