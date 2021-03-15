<script setup>
import { ref, computed, defineProps } from "vue";
import { useImages, users } from "../lib";

const props = defineProps({ channel: String });

const updatedUsers = computed(() =>
  users.value
    .map((user) => {
      return user;
    })
    .sort((a, b) => a.userId.localeCompare(b.userId))
);

const { onStart, onStop, videoRef, canvasRef, sendImageMessages } = useImages(
  props.channel
);

const usersWithImages = computed(() =>
  updatedUsers.value.filter((user) => user.value.image)
);

const started = ref(false);
</script>

<template>
  <div>
    <div style="display: grid; gap: 16px; grid-rows-auto: auto">
      Please allow access to your camera to be a public audience member in our
      venue
      <Button
        v-show="!started"
        @click="
          () => {
            onStart();
            started = !started;
          }
        "
        >Start my camera</Button
      >
      <Button
        v-show="started"
        @click="
          () => {
            onStop();
            started = !started;
          }
        "
        >Stop my camera</Button
      >
    </div>
    <div>
      <video
        ref="videoRef"
        autoplay
        playsinline
        style="
          opacity: 0;
          pointer-events: none;
          width: 0px;
          height: 0px;
          line-height: 0;
        "
      />
      <canvas ref="canvasRef" style="display: none" />
    </div>
    <ImageGrid class="grid-gap: 2px;">
      <img
        v-for="(user, i) in usersWithImages"
        :src="user.value.image"
        :key="i"
        style="display: block; width: 100%; height: auto"
      />
    </ImageGrid>
  </div>
</template>
