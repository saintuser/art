<script setup>
import { useChat, useUser, users } from "../lib/index.js";
const { userId, onUserNameChange } = useUser();
const {
  chatsWithUsers,
  chats,
  newMessage,
  onNewMessage,
  scrollRef,
  textareaRef,
} = useChat("testing");
</script>

<template>
  <pre ref="scrollRef" style="height: 50vh; overflow: auto">{{
    chatsWithUsers
  }}</pre>
  <textarea ref="textareaRef" v-model="newMessage"></textarea>
  <button @click="onNewMessage">Submit</button>
  <div>
    {{ userId }} <button @click="onUserNameChange">Change username</button>
  </div>
  <pre>{{ users }}</pre>
</template>
