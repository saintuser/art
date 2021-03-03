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
      <div>
        <video-stream :src="src" />
        <EventDetails v-if="event" :event="event" />
      </div>
      <chat :channel="channel" />
    </div>
    <div v-if="event && event.tickets" class="EventOverlay">
      <div>
        <h1>{{ event.title }}</h1>
        <div>This event has not yet started.</div>
        <div>
          <a v-if="event.moreinfo" :href="event.moreinfo">
            <Button>More info →</Button>
          </a>
          &ensp;
          <a :href="event.tickets">
            <Button>Get tickets →</Button>
          </a>
        </div>
      </div>
    </div>
    <div style="position: fixed; left: 16px; top: 16px">
      <RouterLink to="/"><Button>← elektron.art</Button></RouterLink>
    </div>
  </div>
</template>

<style>
.Event {
  padding: 64px 32px 32px 32px;
  display: grid;
  gap: 24px;
  grid-template-columns: 2fr 1fr;
}
.EventOverlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
}
.EventOverlay > div {
  display: grid;
  gap: 16px;
  text-align: center;
}
</style>
