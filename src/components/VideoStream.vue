<script setup>
import { defineProps, ref } from "vue";
import { useVideoStream } from "../lib";

const props = defineProps({ src: String });
const { videoRef, status, width, height } = useVideoStream(props.src);
const muted = ref(true);
</script>

<template>
  <div>
    <div style="position: relative; background: var(--bgdark)">
      <video
        ref="videoRef"
        autoplay
        inline
        :muted="muted"
        :style="{
          opacity: status === 'nodata' ? 0 : 1,
          display: 'block',
          width: '100%',
          aspectRatio: width + ' / ' + height,
        }"
      />
      <slot :status="status">
        <transition name="fade" appear v-if="status !== 'playing'">
          <Overlay>
            {{ status }}
          </Overlay>
        </transition>
      </slot>
      <transition name="fade">
        <div
          style="position: absolute; right: 16px; bottom: 16px; color: white"
        >
          <IconUnmute v-if="muted" @click="muted = !muted" />
          <IconMute v-if="!muted" @click="muted = !muted" />
        </div>
      </transition>
    </div>
  </div>
</template>
