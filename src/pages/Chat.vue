<script setup>
import { ref, watch } from "vue";
import {
  useChat,
  useUser,
  users,
  ws,
  createMessage,
  debounce,
  config,
} from "../lib/index.js";

const { userId, onUserNameChange } = useUser();
const { chats, newMessage, onNewMessage, scrollRef, textareaRef } = useChat(
  "testing"
);

const slider = ref(0);

watch(
  () => slider.value,
  debounce(() => {
    const outgoingMessage = createMessage({
      type: "USER",
      value: { slider: slider.value },
    });
    ws.send(outgoingMessage);
  }, config.messageDelay),
  { immediate: true }
);
</script>

<template>
  <div>
    <router-link to="/">Index</router-link>&nbsp;
    <router-link to="/videostream-example">VideoStreamExample</router-link
    >&nbsp;
    <router-link to="/chat-example">ChatExample</router-link>
    <input type="range" v-model="slider" /> {{ slider }}
    <pre ref="scrollRef" style="height: 50vh; overflow: auto">{{ chats }}</pre>
    <textarea ref="textareaRef" v-model="newMessage"></textarea>
    <button @click="onNewMessage">Submit</button>
    <div>
      {{ userId }} <button @click="onUserNameChange">Change username</button>
    </div>
    <pre>{{ users }}</pre>
  </div>
</template>
