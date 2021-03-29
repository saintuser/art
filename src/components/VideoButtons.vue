<script setup>
import { defineProps } from "vue";
defineProps({
  muted: { type: Boolean },
  isFullscreen: { type: Boolean },
  enter: { type: Function },
  exit: { type: Function },
});
</script>

<template>
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
</template>
