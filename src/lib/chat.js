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
  const chats = ref([]);

  watch(
    () => messages.value,
    () => {
      chats.value = [
        ...messages.value.filter(
          (m) => m.type === "CHAT" && m.channel === channel
        ),
        ...chats.value,
      ];
    },
    { immediate: true }
  );

  const newMessage = ref("");

  ws.addEventListener("message", ({ data }) => {
    const message = safeJsonParse(data);
    if (message?.type === "CHAT") {
      chats.value = [...chats.value, message];
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

  return {
    chats,
    newMessage,
    onNewMessage,
    scrollRef,
    textareaRef,
  };
};
