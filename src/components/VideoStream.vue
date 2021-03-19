<script setup>
import { defineProps, ref } from "vue";
import { useFullscreen } from "@vueuse/core";
import { useVideoStream } from "../lib";

const props = defineProps({ src: String });
const { videoRef, status, width, height } = useVideoStream(props.src);

const playerRef = ref(null);
const { isFullscreen, enter, exit, toggle } = useFullscreen(playerRef);

const muted = ref(true);

const statuses = {
  nodata: "Stream is not playing",
  loading: "Stream is loading",
  playing: "",
};
</script>

<template>
  <div style="position: relative; background: var(--bgdark)" ref="playerRef">
    <video
      ref="videoRef"
      autoplay
      playsinline
      loop
      :muted="muted"
      crossorigin="anonymous"
      :style="{
        opacity: status === 'nodata' ? 0 : 1,
        display: 'block',
        width: '100%',
        aspectRatio: width + ' / ' + height,
      }"
    />
    <slot :status="status">
      <Transition name="fade" appear>
        <div v-if="status !== 'playing'">
          <Overlay>
            {{ statuses[status] }}
          </Overlay>
        </div>
      </Transition>
    </slot>
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
          >Unmute&ensp;</Small
        >
        <IconMute v-if="!muted" @click="muted = !muted" />
        <IconUnmute v-if="muted" @click="muted = !muted" />
        &emsp;
        <IconFullscreen v-if="!isFullscreen" @click="enter" />
        <IconUnfullscreen v-if="isFullscreen" @click="exit" />
      </div>
    </transition>
  </div>
</template>
