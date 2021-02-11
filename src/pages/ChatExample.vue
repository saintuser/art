<script setup>
import { useChat } from "../lib/index.js";
const {
  allMessages,
  messages,
  newMessage,
  onNewMessage,
  scrollEl,
  textareaEl,
} = useChat("testing");
</script>

<template>
  <div ref="scrollEl">{{ allMessages }}</div>
  <textarea ref="textareaEl" v-model="newMessage"></textarea>
  <button @click="onNewMessage">Submit</button>
</template>
