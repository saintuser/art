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

<!--template>
  <div>
    <video-stream :src="src" />
  </div>
</template-->

<template>
  <div>
    <div class="Event">
      <div>
        <video-stream :src="src" />
        <EventDetails v-if="event" :event="event" />
      </div>
      <chat :channel="channel" />
    </div>
    <Overlay v-if="event && event.tickets" style="position: fixed">
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
    </Overlay>
    <ButtonBack />
  </div>
</template>

<style>
.Event {
  padding: 64px 32px 32px 32px;
  display: grid;
  gap: 24px;
  grid-template-columns: 2fr 1fr;
}
</style>
