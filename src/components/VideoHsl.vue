<template>
  <div class="debug">
    <button @click="muted = !muted">{{ muted ? "unmute" : "mute" }}</button>
    <video
      controls
      ref="videoRef"
      autoplay
      :muted="muted"
      style="width: 100%"
    />
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useHls } from "../lib";

const props = defineProps({ src: String });
const videoRef = useHls(props.src);
const muted = ref(true);
</script>
