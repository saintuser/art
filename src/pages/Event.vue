<script setup>
import { toRefs, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { replace, config, events } from "../lib/index.js";

const { params } = toRefs(useRoute());

const event = computed(() =>
  events.value.find((event) => event.eventid === params.value.eventid)
);
const src = computed(() => {
  if (params.value.eventid) {
    return replace(config.streamUrl, { streamkey: params.value.eventid });
  }
  return null;
});
const channel = computed(() => params.value.link);
</script>

<template>
  <div class="Event">
    <div>
      <video-stream :src="src" />
      <EventDetails v-if="event" :event="event" />
    </div>
    <chat :channel="channel" />
  </div>
</template>

<style scoped>
.Event {
  padding: 64px 32px 32px 32px;
  display: grid;
  gap: 24px;
  grid-template-columns: 2fr 1fr;
}
</style>
