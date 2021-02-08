<template>
  <button @click="muted = !muted">{{ muted ? "unmute" : "mute" }}</button>
  <!-- <div>{{ isLoading ? "loading" : "playing" }}</div> -->
  {{ status }}
  <div class="debug aspect">
    <video
      controls
      ref="videoRef"
      autoplay
      :muted="muted"
      style="width: 100%; aspect-ratio: 1 / 1"
    />
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useHls } from "../lib";

const props = defineProps({ src: String });
const { videoRef, isLoading, status } = useHls(props.src);
const muted = ref(true);
</script>
