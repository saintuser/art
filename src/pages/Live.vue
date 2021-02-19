<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { replace, config } from "../lib/index.js";

const { params } = useRoute();

const src = computed(() => {
  if (params.streamkey) {
    return replace(config.streamUrl, { streamkey: params.streamkey });
  }
  return null;
});
</script>

<template>
  <div>
    <div style="display: grid; grid-template-columns: 2fr 1fr">
      <video-stream :src="src" />
    </div>
  </div>
</template>
