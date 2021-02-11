import { ref, computed } from "vue";
import {
  safeJsonParse,
  socket,
  useTextarea,
  useScrollToBottom,
  createMessage,
} from "./index.js";

export const useChat = (channel) => {
  const allMessages = ref([]);
  const messages = computed(() =>
    allMessages.value.filter((message) => message.channel === channel)
  );
  const newMessage = ref("");

  socket.addEventListener("message", ({ data }) => {
    const message = safeJsonParse(data);
    if (message?.type === "CHAT") {
      allMessages.value = [...allMessages.value, message];
    }
  });

  const onNewMessage = () => {
    const outgoingMessage = createMessage({
      // TODO: Handle /update and /reset
      type: "CHAT",
      channel: channel,
      value: newMessage.value,
    });
    socket.send(outgoingMessage);
    newMessage.value = "";
  };

  const textareaEl = useTextarea(onNewMessage);
  const scrollEl = useScrollToBottom();

  return {
    allMessages,
    messages,
    newMessage,
    onNewMessage,
    scrollEl,
    textareaEl,
  };
};
