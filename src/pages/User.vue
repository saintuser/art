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
    <input type="range" v-model="slider" /> {{ slider }}
    <pre ref="scrollRef" style="height: 50vh; overflow: auto">{{ chats }}</pre>
    <textarea ref="textareaRef" v-model="newMessage"></textarea>
    <Button @click="onNewMessage">Submit</Button>
    <div>
      {{ userId }} <Button @click="onUserNameChange">Change username</Button>
    </div>
    <pre>{{ users }}</pre>
  </div>
</template>
