<template>
  <div>
    <button @click="muted = !muted">{{ muted ? "unmute" : "mute" }}</button>
    <!-- <div>{{ isLoading ? "loading" : "playing" }}</div> -->
    {{ status }}
    <div>{{ width }} {{ height }}</div>
    <div class="debug" style="position: relative; background: rgba(0, 0, 0, 1)">
      <canvas ref="canvasRef" style="width: 100%"></canvas>
      <video
        ref="videoRef"
        autoplay
        :muted="muted"
        :style="{
          opacity: status === 'nodata' ? 0 : 1,
          position: 'static',
          top: 0,
          left: 0,
          display: 'block',
          width: '100%',
          aspectRatio: width + ' / ' + height,
        }"
      />
      <transition name="fade" appear>
        <div
          v-if="status === 'nodata'"
          style="
            position: absolute;
            display: inline-flex;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            padding: 24px;
          "
        >
          No data
        </div>
      </transition>
      <transition name="fade" appear>
        <div
          v-if="status === 'loading'"
          style="
            position: absolute;
            display: inline-flex;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            padding: 24px;
          "
        >
          Loading
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useHls } from "../lib";

const props = defineProps({ src: String });
const { videoRef, canvasRef, status, width, height } = useHls(props.src);
const muted = ref(true);
</script>
