<script setup>
import { computed } from "vue";
import {
  ws,
  createMessage,
  debounce,
  config,
  users,
  userId,
  useWindow,
} from "../lib";

const otherUsers = computed(() =>
  users.value
    .filter((user) => user.userId !== userId.value)
    .sort((a, b) => a.userId > b.userId)
);

const { centerX, centerY } = useWindow();

const onUserDrag = debounce(({ x, y }) => {
  const outgoingMessage = createMessage({
    type: "USER",
    value: {
      userX: x - centerX.value,
      userY: y - centerY.value,
    },
  });
  ws.send(outgoingMessage);
}, config.messageDelay);

const otherUserStyle = (otherUser) =>
  computed(() => ({
    left: `${otherUser.value.userX + centerX.value}px`,
    top: `${otherUser.value.userY + centerY.value}px`,
  }));
</script>

<template>
  <div
    v-for="(otherUser, i) in otherUsers"
    :key="i"
    :style="{
      ...otherUserStyle(otherUser).value,
      position: 'fixed',
      transition: 'all ' + config.messageDelay * 10 + 'ms linear',
    }"
  >
    <Dot color="#8800FF" opacity="0.5" />
  </div>
  <draggable x="100" y="100" @drag="onUserDrag"
    ><Dot color="red" opacity="0.9"
  /></draggable>
</template>
