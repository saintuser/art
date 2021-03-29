<script setup>
import { defineProps, ref, watch, computed } from "vue";
import { useFullscreen } from "@vueuse/core";
import { useVideoStream, emitter, stats } from "../lib";

const props = defineProps({
  src: { type: String },
  streamkey: { type: String, default: "" },
});
const { videoRef, status, width, height } = useVideoStream(props.src);

const playerRef = ref(null);
const { isFullscreen, enter, exit, toggle } = useFullscreen(playerRef);

const muted = ref(true);

const statuses = {
  nodata: "Stream is not playing",
  loading: "Stream is loading",
  playing: "",
};

// Snapshot

const canvasRef = ref(null);
const context = ref(null);
const canvasSizeMultiplier = 1;

watch([videoRef, canvasRef, width, height], () => {
  if (videoRef.value && canvasRef.value) {
    context.value = canvasRef.value.getContext("2d");
  }
  if (width.value && height.value) {
    canvasRef.value.width = width.value * canvasSizeMultiplier;
    canvasRef.value.height = height.value * canvasSizeMultiplier;
  }
});

emitter.on("SNAPSHOT_REQUEST", () => {
  context.value.drawImage(
    videoRef.value,
    0,
    0,
    width.value * canvasSizeMultiplier,
    height.value * canvasSizeMultiplier
  );
  emitter.emit(
    "SNAPSHOT_RESPONSE",
    canvasRef.value.toDataURL("image/jpeg", 0.8)
  );
});

const usePip = (videoRef) => {
  const pipAvailable = "pictureInPictureEnabled" in document;
  const pipEnabled = ref(false);
  const pipEnter = () => {
    if (pipAvailable && videoRef.value) {
      videoRef.value
        .requestPictureInPicture()
        .then(() => (pipEnabled.value = true));
    }
  };
  const pipExit = () => {
    document.exitPictureInPicture().then(() => (pipEnabled.value = false));
  };
  return { pipAvailable, pipEnabled, pipEnter, pipExit };
};

const { pipAvailable, pipEnabled, pipEnter, pipExit } = usePip(videoRef);
const stat = computed(() => {
  const viewers = stats.value.find(
    (s) => props.streamkey && props.streamkey == s.group
  );
  return viewers?.count;
});
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
    <canvas ref="canvasRef" style="display: none" />
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
      <div>
        <Flex
          v-if="stat && status === 'playing'"
          style="
            position: absolute;
            left: clamp(5px, 2vw, 24px);
            bottom: clamp(5px, 2vw, 24px);
          "
        >
          <IconEye />
          <Smaller>{{ stat }}</Smaller>
        </Flex>
        <Flex
          style="
            position: absolute;
            right: clamp(5px, 2vw, 24px);
            bottom: clamp(5px, 2vw, 24px);
            color: white;
            gap: 12px;
          "
        >
          <Small v-if="muted" @click="muted = !muted" style="cursor: pointer"
            >Turn on sound</Small
          >
          <Small v-if="!muted">&nbsp;</Small>
          <IconMute v-if="!muted" @click="muted = !muted" />
          <IconUnmute v-if="muted" @click="muted = !muted" />
          <IconPip v-if="pipAvailable && !pipEnabled" @click="pipEnter" />
          <IconUnpip v-if="pipAvailable && pipEnabled" @click="pipExit" />
          <IconFullscreen v-if="!isFullscreen" @click="enter" />
          <IconUnfullscreen v-if="isFullscreen" @click="exit" />
        </Flex>
      </div>
    </transition>
  </div>
</template>
