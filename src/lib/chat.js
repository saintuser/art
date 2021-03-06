//@ts-check
import { ref, computed, watch, isRef, watchEffect } from "vue";
import {
  ws,
  useTextarea,
  useScrollToBottom,
  createMessage,
  messagesWithUsers,
} from "./index.js";

export const useChat = (channel) => {
  const ch = isRef(channel) ? channel : ref(channel);
  watchEffect(() => console.log("!!", ch.value));

  const chats = computed(() =>
    messagesWithUsers.value.filter(
      (m) => m.type === "CHAT" && m.channel === ch.value
    )
  );

  const newMessage = ref("");

  const onNewMessage = () => {
    const outgoingMessage = createMessage({
      type: "CHAT",
      channel: ch.value,
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
