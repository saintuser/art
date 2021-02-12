<script setup>
import { VideoStream } from "../components/index.js";
import { replace, config } from "../lib/index.js";

const urls = ["test2"].map((streamkey) =>
  replace(config.streamUrl, { streamkey })
);
</script>

<template>
  <div>
    <router-link to="/">Index</router-link>&nbsp;
    <router-link to="/videostream-example">VideoStreamExample</router-link
    >&nbsp;
    <router-link to="/chat-example">ChatExample</router-link>
    <div style="display: grid; grid-template-columns: 1fr 1fr">
      <video-stream :src="urls[0]" />
    </div>
  </div>
</template>
