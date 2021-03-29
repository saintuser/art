<script setup>
import { ref } from "vue";

import { useVideoStream, config, replace } from "../lib";

//const src = replace(config.streamUrl, { streamkey: "360" });
const src =
  "https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8";

const { videoRef, status, width, height } = useVideoStream(src);

const muted = ref(true);
</script>

<template>
  <div style="padding: 32px">
    <video
      ref="videoRef"
      autoplay
      loop
      :muted="muted"
      style="width: 640px"
      crossorigin="anonymous"
      playsinline
    />
    <Three>
      <ThreeVideoStream :video="videoRef" />
      <ThreeDots />
    </Three>
    <IconUnmute v-if="muted" @click="muted = !muted" />
    <IconMute v-if="!muted" @click="muted = !muted" />
  </div>
</template>
