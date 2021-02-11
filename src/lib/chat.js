import { ref, computed, watch } from "vue";
import {
  safeJsonParse,
  ws,
  useTextarea,
  useScrollToBottom,
  createMessage,
  config,
  messages as m,
} from "./index.js";

export const useChat = (channel) => {
  const allMessages = ref([]);

  watch(
    () => m.value,
    () => {
      allMessages.value = [
        ...m.value.filter((m) => m.type === "CHAT"),
        ...allMessages.value,
      ];
    },
    { immediate: true }
  );

  const messages = computed(() =>
    allMessages.value.filter((message) => message.channel === channel)
  );
  const newMessage = ref("");

  ws.addEventListener("message", ({ data }) => {
    const message = safeJsonParse(data);
    if (message?.type === "CHAT") {
      allMessages.value = [...allMessages.value, message];
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
