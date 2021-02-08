<template>
  <div>
    <button @click="muted = !muted">{{ muted ? "unmute" : "mute" }}</button>
    <!-- <div>{{ isLoading ? "loading" : "playing" }}</div> -->
    {{ status }}
    <div>{{ width }} {{ height }}</div>
    <div class="debug aspect">
      <video
        ref="videoRef"
        autoplay
        :muted="muted"
        :style="{
          display: 'block',
          width: '100%',
          aspectRatio: width + ' / ' + height,
        }"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useHls } from "../lib";

const props = defineProps({ src: String });
const { videoRef, status, width, height } = useHls(props.src);
const muted = ref(true);
</script>
