//@ts-check
import {
  computed,
  isRef,
  ref,
} from 'vue';

import {
  createMessage,
  messagesWithUsers,
  useScrollToBottom,
  useTextarea,
  ws,
} from './';
import { userName } from './users';

export const useChat = (channel, sendType = "CHAT", receiveType = "CHAT") => {
  const chatChannel = isRef(channel) ? channel : ref(channel);
  const chatSendType = isRef(sendType) ? sendType : ref(sendType);
  const chatReceiveType = isRef(receiveType) ? receiveType : ref(receiveType);

  const chats = computed(() =>
    messagesWithUsers.value.filter(
      (m) => m.type === chatReceiveType.value && m.channel === chatChannel.value
    )
  );

  const newMessage = ref("");

  const onNewMessage = () => {
    if (newMessage.value) {
      const outgoingMessage = createMessage({
        type: chatSendType.value,
        channel: chatChannel.value,
        userName: userName.value,
        value: newMessage.value,
        history: true,
      });
      ws.send(outgoingMessage);
      newMessage.value = "";
    }
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
