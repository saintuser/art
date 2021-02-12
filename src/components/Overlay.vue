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
      position: 'absolute',
      left: otherUser.value.userX + 'px',
      top: otherUser.value.userY + 'px',
      background: 'red',
      padding: '16px',
    }"
  >
    <pre>{{ otherUser.userId }}</pre>
  </div>
  <draggable x="10" y="10" @drag="onUserDrag"
    ><div style="background: purple; padding: 16px">
      <pre>{{ userId }}</pre>
    </div>
  </draggable>
</template>
