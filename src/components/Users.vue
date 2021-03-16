<script setup>
import { computed } from "vue";
import { differenceInMilliseconds } from "date-fns";

import {
  ws,
  createMessage,
  debounce,
  config,
  users,
  userId,
  useWindow,
  scale,
  useUser,
  userName,
} from "../lib";

const updatedUsers = computed(() =>
  users.value
    .map((user) => {
      user.updatedSince = differenceInMilliseconds(
        new Date(),
        new Date(user.datetime)
      );
      user.opacity = Math.min(
        0.8,
        scale(user.updatedSince, 0, config.userUpdatedSinceLimit, 1, 0.1)
      );
      return user;
    })
    .filter((user) => user.updatedSince < config.userUpdatedSinceLimit)
    .sort((a, b) => a.userId.localeCompare(b.userId))
);

const otherUsers = computed(() =>
  updatedUsers.value
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
    <div style="display: grid; grid-template-columns: auto auto; gap: 8px">
      <Dot
        color="#8800FF"
        style="transition: opacity 1000ms"
        :opacity="otherUser.opacity"
      />
      <div>{{ otherUser.value.userName }}</div>
    </div>
  </div>
  <draggable x="100" y="100" @drag="onUserDrag">
    <div style="display: grid; grid-template-columns: auto auto; gap: 8px">
      <Dot color="red" opacity="0.8" />
      <div>{{ userName }}</div>
    </div>
  </draggable>
</template>
