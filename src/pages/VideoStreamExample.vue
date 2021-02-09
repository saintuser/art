<template>
  {{ events }}
  <router-link to="/">VideoStream</router-link>
  <div style="display: grid; grid-template-columns: 1fr 1fr">
    <video-stream :src="urls[0]" />
  </div>
</template>

<script setup>
import { VideoStream } from "../components/index.js";
import { inject, useEvents, config } from "../lib/index.js";

const urls = ["test2"].map((streamkey) =>
  inject(config.streamUrl, { streamkey })
);
const events = useEvents();
</script>
