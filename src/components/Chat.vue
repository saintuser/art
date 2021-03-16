<script setup>
import { watchEffect, defineProps, toRefs } from "vue";
import { useChat } from "../lib/index.js";

const props = defineProps({
  channel: String,
  sendType: String,
  receiveType: String,
});
const { channel, sendType, receiveType } = toRefs(props);

const { chats, newMessage, onNewMessage, scrollRef, textareaRef } = useChat(
  channel,
  sendType,
  receiveType
);
</script>

<template>
  <div class="Chat">
    <div class="ChatCards" ref="scrollRef">
      <ChatCard v-for="(chat, i) in chats" :key="i" :chat="chat" />
    </div>
    <textarea
      ref="textareaRef"
      v-model="newMessage"
      placeholder="Write a chat message here"
    ></textarea>
    <Button @click="onNewMessage">Send chat message</Button>
  </div>
</template>

<style scoped>
.Chat {
  display: grid;
  gap: 16px;
  grid-template-rows: 1fr auto auto;
  height: 100%;
}
.ChatCards {
  display: grid;
  grid-auto-rows: min-content;
  gap: 8px;
  overflow: auto;
}
</style>
