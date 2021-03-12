<script setup>
import { computed } from "vue";
import { useImages, users } from "../lib";

const updatedUsers = computed(() =>
  users.value
    .map((user) => {
      return user;
    })
    .sort((a, b) => a.userId.localeCompare(b.userId))
);

const { onStart, onStop, videoRef, canvasRef, sendImageMessages } = useImages(
  "images"
);

const usersWithImages = computed(() =>
  updatedUsers.value.filter((user) => user.value.image)
);
</script>

<template>
  <div style="padding: 32px">
    <button @click="onStart">Start</button>
    <button @click="onStop">Stop</button>
    <div style="display: flex; align-items: flex-start">
      <video
        ref="videoRef"
        autoplay
        playsinline
        style="opacity: 1; pointer-events: none"
        class="debug"
      />
      <canvas class="debug" ref="canvasRef" style="display: block" />
    </div>
    <h1>Users</h1>
    <div style="width: 200px">
      <ImageGrid>
        <img
          v-for="(user, i) in usersWithImages"
          :src="user.value.image"
          :key="i"
          style="display: block; width: 100%; height: auto"
        />
      </ImageGrid>
    </div>
    <pre>{{ updatedUsers }}</pre>
  </div>
</template>

<!--

import { events } from "../deps/live.js";
import { useImages } from "../lib/index.js";
import { channel } from "../../config.js";

export default {
  setup() {
    const {
      onStart,
      onStop,
      images2,
      videoEl,
      canvasEl,
      sendImageMessages,
    } = useImages(channel);

    sendImageMessages();

    events.on("cameraon", onStart);
    events.on("cameraoff", onStop);

    return { images2, videoEl, canvasEl };
  },
  template: `
    <video
      ref="videoEl"
      autoplay
      playsinline
      style="
        position: fixed;
        top: 0;
        right: 0;
        opacity: 0;
        pointer-events: none;
      "
    />
    <canvas ref="canvasEl" style="display: none" />
  `,
};

-->
