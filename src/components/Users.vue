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
  onUserNameChange,
  useAboutTextarea,
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
      userName: userName.value,
      userAbout: userAbout.value,
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

const textareaRef = useAboutTextarea(showMessages);
</script>

<template>
  <div>
    <Overlay
      style="
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
        transition: opacity 600ms;
      "
      :style="{ opacity: showMessages ? 0.9 : 0 }"
    />
    <div style="position: fixed; left: 12px; bottom: 12px">
      <IconMessage @click="showMessages = !showMessages" />
    </div>
    <transition name="fade">
      <div v-show="showMessages" class="AboutPanel">
        <div style="display: flex; font-size: 0.8em">
          <div style="opacity: 0.5">My name is {{ userName }}</div>
          &ensp;
          <div @click="onUserNameChange" style="cursor: pointer">Change</div>
        </div>
        <textarea
          ref="textareaRef"
          v-model="userAbout"
          placeholder="Write here a message"
        />
      </div>
    </transition>
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
          <div style="font-size: 0.9em">{{ userAbout }}</div>
        </div>
      </div>
    </draggable>
  </div>
</template>

<style>
.AboutPanel {
  position: fixed;
  left: 12px;
  bottom: 48px;
  padding: 16px;
  background: var(--bglight);
  border-radius: 6px;
  display: grid;
  grid-auto-rows: max-height;
  gap: 8px;
  width: 300px;
}
@media (max-width: 800px) {
  .AboutPanel {
    width: calc(100vw - 12px - 12px);
  }
}
</style>
