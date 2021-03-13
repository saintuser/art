<script setup>
import { toRefs, computed, watch } from "vue";
import { useRoute, onBeforeRouteLeave } from "vue-router";
import { useCssVar } from "@vueuse/core";

import { replace, config, events, pages, activeTheme } from "../lib/index.js";

const { params } = toRefs(useRoute());

const event = computed(() => {
  const e = events.value.find(
    (event) => event.eventid === params.value.eventid
  );
  if (e && e.pageid && pages.value) {
    e.page = pages.value.find((page) => page.pageid === e.pageid);
  }
  return e;
});

const formatStreamUrl = (streamkey) => {
  if (streamkey.endsWith("m3u8")) {
    return streamkey;
  } else {
    return replace(config.streamUrl, { streamkey });
  }
};

const srcs = computed(() => {
  if (event.value && event.value.streamkeys) {
    return event.value.streamkeys.map(formatStreamUrl);
  } else if (params.value.eventid) {
    return [formatStreamUrl(params.value.eventid)];
  } else {
    return [];
  }
});
const channel = computed(() => params.value.link);

const eventAudienceWidth = useCssVar("--event-audience-width");
const eventAudienceColumns = useCssVar("--event-audience-columns");

const audienceColumns = computed(
  () => {
    let images = false;
    let chat = true;
    let snapshot = false;
    if (event.value) {
      if (event.value.chat === "FALSE") {
        chat = false;
      }
      if (event.value.images === "TRUE") {
        images = true;
      }
      if (event.value.snapshot === "TRUE") {
        snapshot = true;
      }
    }
    return { images, chat, snapshot };
  },
  { immediate: true }
);

watch(
  audienceColumns,
  () => {
    const columns = Object.values(audienceColumns.value).filter((col) => col);

    eventAudienceWidth.value = `${columns.length * 300}px`;
    eventAudienceColumns.value = columns.map((_) => "1fr").join(" ");
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <div class="Event">
      <div class="EventContent">
        <!-- @TODO Make VideoStream reactive -->
        <div v-if="event">
          <component
            v-for="(src, i) in srcs"
            :key="i"
            :is="
              event && event.is360 === 'TRUE'
                ? 'video-stream-three'
                : 'video-stream'
            "
            :src="src"
          />
        </div>
        <div v-else>
          <VideoStream :src="srcs[0]" />
        </div>
        <EventDetails v-if="event" :event="event" />
      </div>
    </div>
    <Transition name="fade">
      <div
        v-if="
          audienceColumns.images ||
          audienceColumns.chat ||
          audienceColumns.snapshot
        "
        class="EventAudience"
      >
        <Images v-if="audienceColumns.images" />
        <Chat v-if="audienceColumns.chat" :channel="channel" />
        <div v-if="audienceColumns.snapshot" style="display: grid">
          Snapshot
        </div>
      </div>
    </Transition>
    <EventOverlay v-if="event && event.tickets" :event="event" />
    <ButtonBack />
  </div>
</template>

<style scoped>
.Event {
  display: grid;
  grid-template-columns: 1fr var(--event-audience-width);
  min-height: 100vh;
  transition: 200ms;
}
@media (max-width: 800px) {
  .Event {
    grid-template-columns: 1fr;
  }
}
.EventContent {
  padding: 64px 32px 32px 32px;
  display: grid;
  grid-auto-rows: max-content;
  gap: 16px;
}
.EventContent > *:last-child {
  height: calc(100vh - 64px - 64px);
  overflow: auto;
}
.EventAudience {
  padding: 64px 32px 32px 32px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: var(--event-audience-width);
  background: var(--bglight);
  display: grid;
  grid-template-columns: var(--event-audience-columns);
  transition: 200ms;
}
@media (max-width: 800px) {
  .EventAudience {
    position: static;
    width: inherit;
    padding-top: 32px;
    grid-template-columns: 1fr;
  }
  .Event .EventDetails {
    /* max-height: calc(50vh - 64px); @TODO: Bring it back*/
  }
}
</style>
