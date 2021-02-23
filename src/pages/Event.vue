<script setup>
import { toRefs, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { replace, config, events } from "../lib/index.js";

const { params } = toRefs(useRoute());

const event = computed(() =>
  events.value.find((event) => event.streamkey[0] === params.value.streamkey)
);
const src = computed(() => {
  if (params.value.streamkey) {
    return replace(config.streamUrl, { streamkey: params.value.streamkey });
  }
  return null;
});
</script>

<template>
  <div style="padding: 32px">
    <RouterLink to="/" class="button">Back</RouterLink>
    <div style="display: grid; grid-template-columns: 2fr 1fr">
      <video-stream :src="src" />
    </div>
    <EventDetails v-if="event" :event="event" />
  </div>
</template>
