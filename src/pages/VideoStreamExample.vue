<template>
  <div style="display: grid; grid-template-columns: 1fr 1fr">
    <video-stream :src="urls[0]" />
  </div>
</template>

<script setup>
import { VideoStream } from "../components/index.js";
import { inject } from "../lib/index.js";

const streamUrl = import.meta.env.VITE_STREAM_PATH || "";

const urls = ["test2"].map((streamkey) => inject(streamUrl, { streamkey }));
console.log(urls);
</script>
