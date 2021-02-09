<template>
  <div style="display: grid; grid-template-columns: 1fr 1fr">
    <video-hsl :src="urls[0]" />
  </div>
</template>

<script setup>
import VideoHsl from "./components/VideoHsl.vue";
const streamUrl = (id) =>
  `https://le25.babahhcdn.com/bb1150-le/${id}/index.m3u8`;
const urls = ["test2"].map(streamUrl);
</script>

<style>
body {
  font-family: sans-serif;
  background: yellow;
}
.debug {
  border: 3px solid red;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
* {
  transition: opacity 0.5s linear;
}
</style>
