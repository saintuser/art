<script setup>
import { watchEffect, defineProps } from "vue";
import { useChat } from "../lib/index.js";

const props = defineProps({ channel: String });
const { chats, newMessage, onNewMessage, scrollRef, textareaRef } = useChat(
  props.channel
);
</script>

<template>
  <div class="Chat">
    <div class="ChatCards" ref="scrollRef">
      <TransitionGroup name="fade">
        <chat-card
          class="debug"
          v-for="(chat, i) in chats"
          :key="i"
          :chat="chat"
      /></TransitionGroup>
    </div>
    <textarea ref="textareaRef" v-model="newMessage"></textarea>
    <Button @click="onNewMessage">Submit</Button>
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
