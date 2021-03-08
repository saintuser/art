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
  <div>
    <div class="Event">
      <div class="EventContent">
        <VideoStream :src="src" />
        <EventDetails v-if="event" :event="event" />
      </div>
    </div>
    <Chat class="EventChat debug" :channel="channel" />
    <EventOverlay v-if="event && event.tickets" :event="event" />
    <ButtonBack />
  </div>
</template>

<style>
.Event {
  display: grid;
  grid-template-columns: 1fr 300px;
  min-height: 100vh;
}
@media (max-width: 800px) {
  .Event {
    grid-template-columns: 1fr;
  }
}
.EventContent {
  padding: 64px 32px 32px 32px;
  display: grid;
  gap: 16px;
}
.EventContent > *:last-child {
  border: 2px solid red;
  height: calc(100vh - 64px - 64px);
  overflow: auto;
}
.EventChat {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  padding: 64px 32px 32px 32px;
  background: var(--bglight);
}
@media (max-width: 800px) {
  .EventChat {
    position: static;
    width: inherit;
    height: calc(100vh - 64px);
    padding-top: 32px;
  }
  .Event .EventDetails {
    height: calc(100vh - 64px);
  }
}
</style>
