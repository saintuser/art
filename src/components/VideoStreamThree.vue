<script setup>
import { defineProps, ref } from "vue";
import { useFullscreen } from "@vueuse/core";
import { useVideoStream } from "../lib";

const props = defineProps({ src: String });
const { videoRef, status, width, height } = useVideoStream(props.src);

const playerRef = ref(null);
const { isFullscreen, enter, exit, toggle } = useFullscreen(playerRef);

const muted = ref(true);
</script>

<template>
  <div ref="playerRef" style="position: relative">
    <video
      ref="videoRef"
      autoplay
      loop
      :muted="muted"
      style="
        opacity: 0;
        position: fixed;
        top: 0;
        left: 0;
        z-index: -100000;
        pointer-events: none;
      "
      crossorigin="anonymous"
      playsinline
    />
    <div class="VideoStreamThree">
      <Three>
        <ThreeVideoStream :video="videoRef" />
        <ThreeDots />
      </Three>
      <transition name="fade">
        <div
          style="
            position: absolute;
            right: clamp(5px, 2vw, 24px);
            bottom: clamp(5px, 2vw, 24px);
            color: white;
            display: flex;
            align-items: center;
          "
        >
          <Small v-if="muted" @click="muted = !muted" style="cursor: pointer"
            >Turn on sound&ensp;</Small
          >
          <IconMute v-if="!muted" @click="muted = !muted" />
          <IconUnmute v-if="muted" @click="muted = !muted" />
          &emsp;
          <IconFullscreen v-if="!isFullscreen" @click="enter" />
          <IconUnfullscreen v-if="isFullscreen" @click="exit" />
        </div>
      </transition>
    </div>
  </div>
</template>

<style>
.VideoStreamThree {
  position: relative;
  aspect-ratio: 16 / 9;
}
.VideoStreamThree canvas {
  width: 100% !important;
  height: 100% !important;
}
.VideoStreamThree .mute {
  position: absolute;
  right: 16px;
  bottom: 16px;
  color: white;
}
</style>
