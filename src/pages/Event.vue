<script setup>
import { ref, toRefs, computed, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCssVar } from "@vueuse/core";

import {
  replace,
  config,
  events,
  pages,
  activeTheme,
  checkTicket,
  users,
} from "../lib";

const { params } = toRefs(useRoute());
const router = useRouter();

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
const channel = computed(() => params.value.eventid);

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

const route = useRoute();
const code = ref(route.query.code);
const sumittedCode = ref(null);

const { status, statusMessage } = checkTicket(sumittedCode, event);

const onCheck = () => {
  sumittedCode.value = code.value;
};

watch(status, () => {
  if (status.value === "CHECKED" && route.query.code) {
    router.push({ path: `/${params.value.eventid}` });
  }
});
</script>

<template>
  <div>
    <div class="Event">
      <div class="EventContent">
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
        <h2 v-if="event?.title">{{ event.title }}</h2>
        <EventDate v-if="event?.from" :event="event" />
        <Vertical v-if="event?.description" v-html="event.description" />
      </div>
    </div>
    <div
      v-if="
        audienceColumns.images ||
        audienceColumns.chat ||
        audienceColumns.snapshot
      "
      class="EventPanels"
    >
      <EventPanel
        v-if="audienceColumns.images"
        title="Audience"
        style="background: var(--bglight)"
      >
        <Images />
      </EventPanel>
      <EventPanel
        v-if="audienceColumns.chat"
        title="Chat"
        :subtitle="users.length + ' online'"
        style="background: var(--bglighter)"
      >
        <Chat :channel="channel"
      /></EventPanel>
      <div v-if="audienceColumns.snapshot" style="display: grid"></div>
    </div>
    <Flex
      v-if="event && event.fientaid && status === 'CHECKED'"
      style="position: fixed; right: 12px; top: 12px"
    >
      <a title="I have a ticket"
        ><IconCreditcard style="color: var(--ticket)"
      /></a>
    </Flex>
    <Overlay
      v-if="event && event.fientaid && status !== 'CHECKED'"
      :event="event"
      style="position: fixed; top: 0; right: 0; bottom: 0; left: 0"
    >
      <IconCreditcard style="transform: scale(3); color: var(--ticket)" />
      <p />
      <p />
      <h1>{{ event.title }}</h1>
      <div>
        This event requires you have a ticket. Note that it will only work on a
        single device.
      </div>
      <!-- <div>This event has not yet started but you can already enter.</div> -->
      <input
        v-model="code"
        placeholder="Type the ticket code"
        style="width: 200px"
      />
      <ButtonBig @click="onCheck">Enter to the event</ButtonBig>
      <p />
      <div v-if="status === 'USED'">
        This ticket has been used already. We only support using the ticket on a
        single device, sorry.
      </div>
      <a
        v-if="event.ticketUrl"
        :href="event.ticketUrl"
        style="border-bottom: 1px solid var(--fg)"
        target="_blank"
      >
        No tickets yet? Get them here
      </a>
      <p />
      <p v-if="config.phoneUrl">
        <span style="opacity: 0.5">Having problems with getting in? Call</span
        >&nbsp;
        <a :href="config.phoneUrl" style="border-bottom: 1px solid var(--fg)">{{
          config.phoneUrl.replace("tel:", "")
        }}</a>
      </p></Overlay
    >

    <ButtonBack :to="event?.pageid ? '/page/' + event.pageid : '/'" />
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
  padding: 64px 32px 32px clamp(1.5rem, 5vw, 3rem);
  display: grid;
  grid-auto-rows: max-content;
  gap: 16px;
}
.EventContent > *:last-child {
  height: calc(100vh - 64px - 64px);
  overflow: auto;
}
.EventPanels {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: var(--event-audience-width);
  display: grid;
  grid-template-columns: var(--event-audience-columns);
  transition: 200ms;
}
@media (max-width: 800px) {
  .EventPanels {
    position: static;
    width: inherit;
    grid-template-columns: 1fr;
  }
}
</style>
