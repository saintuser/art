import { ref, computed, watch } from "vue";
import {
  safeJsonParse,
  ws,
  useTextarea,
  useScrollToBottom,
  createMessage,
  config,
  messages,
  users,
} from "./index.js";

export const useChat = (channel) => {
  const chatMessages = ref([]);

  watch(
    () => messages.value,
    () => {
      chatMessages.value = [
        ...messages.value.filter(
          (m) => m.type === "CHAT" && m.channel === channel
        ),
        ...chatMessages.value,
      ];
    },
    { immediate: true }
  );

  const newMessage = ref("");

  ws.addEventListener("message", ({ data }) => {
    const message = safeJsonParse(data);
    if (message?.type === "CHAT") {
      chatMessages.value = [...chatMessages.value, message];
    }
  });

  const onNewMessage = () => {
    const outgoingMessage = createMessage({
      type: "CHAT",
      channel: channel,
      value: newMessage.value,
      history: true,
    });
    ws.send(outgoingMessage);
    newMessage.value = "";
  };

  const textareaRef = useTextarea(onNewMessage);
  const scrollRef = useScrollToBottom();

  const addUsers = (messages) =>
    computed(() => {
      const usersMap = Object.fromEntries(
        users.value
          .map((user) => {
            if (user.value?.userName) {
              return [user.userId, user.value.userName];
            }
          })
          .map((user) => user)
      );
      return messages.value.map((message) => {
        if (usersMap[message.userId]) {
          message.userName = usersMap[message.userId];
        }
        return message;
      });
    });

  const chats = addUsers(chatMessages);

  return {
    chats,
    newMessage,
    onNewMessage,
    scrollRef,
    textareaRef,
  };
};
