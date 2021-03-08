<script setup>
import { watchEffect, defineProps, toRefs } from "vue";
import { useChat } from "../lib/index.js";

const props = defineProps({ channel: String });
const { channel } = toRefs(props);
const { chats, newMessage, onNewMessage, scrollRef, textareaRef } = useChat(
  channel
);
</script>

<template>
  <div>
    <h2>{{ channel }}</h2>
    <div class="Chat">
      <div class="ChatCards" ref="scrollRef">
        <TransitionGroup name="fade">
          <chat-card v-for="(chat, i) in chats" :key="i" :chat="chat"
        /></TransitionGroup>
      </div>
      <textarea
        ref="textareaRef"
        v-model="newMessage"
        placeholder="Write a chat message here"
      ></textarea>
      <Button @click="onNewMessage">Send</Button>
    </div>
  </div>
</template>

<style scoped>
.Chat {
  display: grid;
  gap: 8px;
  grid-template-rows: 1fr auto auto;
}
.ChatCards {
  display: grid;
  grid-auto-rows: min-content;
  gap: 8px;
  overflow: auto;
}
</style>
