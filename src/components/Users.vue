<script setup>
import { computed, ref } from "vue";
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
  userName,
  userAbout,
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
    .filter(
      (user) =>
        user.userId !== userId.value && user.value.userX && user.value.userY
    )
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

const showMessages = ref(false);
</script>

<template>
  <div>
    <transition name="fade">
      <Overlay
        v-if="showMessages"
        style="height: 100vh; opacity: 0.8; pointer-events: none"
      />
    </transition>
    <div style="position: fixed; left: 16px; bottom: 16px">
      <IconMessage @click="showMessages = !showMessages" />
    </div>
    <div v-if="showMessages" style="position: fixed; left: 16px; bottom: 48px">
      <div style="display: flex; font-size: 0.7em">
        <div style="opacity: 0.5">
          <span style="color: red; transform: translateY(-20px)">⬤</span> My
          name is {{ userName }}
        </div>
        &ensp;
        <div @click="onUserNameChange" style="cursor: pointer">Change</div>
      </div>
      <textarea
        v-model="userAbout"
        style="width: 300px"
        placeholder="Write here a message"
      />
    </div>
    <div
      v-for="(otherUser, i) in otherUsers"
      :key="i"
      :style="{
        ...otherUserStyle(otherUser).value,
        position: 'fixed',
        transition: 'all ' + config.messageDelay * 10 + 'ms linear',
      }"
    >
      <div style="display: grid; grid-template-columns: auto 300px; gap: 8px">
        <Dot
          color="#8800FF"
          style="transition: opacity 1000ms"
          :opacity="showMessages ? 1 : otherUser.opacity"
        />
        <div v-if="showMessages">
          <div
            style="
              font-size: 0.8em;
              opacity: 0.5;
              line-height: 1.3em;
              padding-top: 0.3em;
            "
          >
            {{ otherUser.value.userName }}
          </div>
          <div>{{ otherUser.value.userAbout }}</div>
          <div>{{ otherUser.value }}</div>
        </div>
      </div>
    </div>
    <draggable x="100" y="100" @drag="onUserDrag">
      <div style="display: grid; grid-template-columns: auto 300px; gap: 8px">
        <Dot color="red" opacity="0.8" />
        <div v-if="showMessages">
          <div
            style="
              font-size: 0.8em;
              opacity: 0.5;
              line-height: 1.3em;
              padding-top: 0.3em;
            "
          >
            {{ userName }}
          </div>
          <div>{{ userAbout }}</div>
        </div>
      </div>
    </draggable>
  </div>
</template>
