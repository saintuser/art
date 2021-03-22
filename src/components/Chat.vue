<script setup>
import { defineProps, toRefs } from "vue";
import { useChat, userName, onUserNameChange } from "../lib";

const props = defineProps({
  channel: { type: String },
  sendtype: { type: String, default: "CHAT" },
  receivetype: { type: String, default: "CHAT" },
});

const { channel, sendtype, receivetype } = toRefs(props);

const { chats, newMessage, onNewMessage, scrollRef, textareaRef } = useChat(
  channel,
  sendtype,
  receivetype
);
</script>

<template>
  <Vertical style="grid-template-rows: 1fr auto auto; height: 80vh">
    <div class="ChatCards" ref="scrollRef">
      <ChatCard v-for="(chat, i) in chats" :key="i" :chat="chat" />
    </div>
    <div style="display: flex; font-size: 0.8em; transform: translateY(12px)">
      <div style="opacity: 0.5">My name is {{ userName }}</div>
      &ensp;
      <div @click="onUserNameChange" style="cursor: pointer">Change</div>
    </div>
    <textarea
      style="width: 100%"
      ref="textareaRef"
      v-model="newMessage"
      placeholder="Write a chat message here"
    ></textarea>
    <Button @click="onNewMessage">Send chat message</Button>
  </Vertical>
</template>

<style scoped>
.Chat {
  display: grid;
  gap: 8px;
  grid-template-rows: 1fr auto auto;
  height: 80vh;
}
.ChatCards {
  display: grid;
  grid-auto-rows: min-content;
  gap: 8px;
  overflow: auto;
}
</style>
