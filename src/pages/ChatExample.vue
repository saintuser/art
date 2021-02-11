<script setup>
import { useChat, useUser, useUsers } from "../lib/index.js";
const { users } = useUsers();
const { userId, onUserNameChange } = useUser();
const { allMessages, newMessage, onNewMessage, scrollEl, textareaEl } = useChat(
  "testing"
);
</script>

<template>
  <pre ref="scrollEl" style="height: 50vh; overflow: auto">{{
    allMessages
  }}</pre>
  <textarea ref="textareaEl" v-model="newMessage"></textarea>
  <button @click="onNewMessage">Submit</button>
  <div>
    {{ userId }} <button @click="onUserNameChange">Change username</button>
  </div>
  <pre>{{ users.length }}</pre>
  <pre>{{ users }}</pre>
</template>
