<script setup>
import { computed } from "vue";
import { ws, createMessage, debounce, config, users, userId } from "../lib";

const otherUsers = computed(() =>
  users.value
    .filter((user) => user.userId !== userId.value)
    .sort((a, b) => a.userId > b.userId)
);

const onUserDrag = debounce(({ x, y }) => {
  const outgoingMessage = createMessage({
    type: "USER",
    value: {
      userX: x,
      userY: y,
    },
  });
  ws.send(outgoingMessage);
}, config.messageDelay);
</script>

<template>
  <div
    v-for="(otherUser, i) in otherUsers"
    :key="i"
    :style="{
      position: 'fixed',
      left: otherUser.value.userX + 'px',
      top: otherUser.value.userY + 'px',
      transition: 'all ' + config.messageDelay * 10 + 'ms linear',
      width: '300px',
      height: '250px',
    }"
  >
    <Dot color="#8800FF" opacity="0.5" />
  </div>
  <draggable x="20" y="20" @drag="onUserDrag"
    ><Dot color="#8800FF" opacity="0.9"
  /></draggable>
</template>
