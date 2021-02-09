<template>
  <div style="display: grid; grid-template-columns: 1fr 1fr">
    <video-hsl :src="urls[0]" />
  </div>
</template>

<script setup>
import VideoHsl from "./components/VideoHsl.vue";
import { inject } from "./lib/index.js";

const streamUrl = import.meta.env.VITE_STREAM_PATH || "";

const urls = ["test2"].map((streamkey) => inject(streamUrl, { streamkey }));
console.log(urls);
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
