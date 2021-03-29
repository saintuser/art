<script setup>
import { computed } from "vue";
import {
  config,
  pages,
  events,
  useCountdown,
  useWindow,
  activeTheme,
} from "../lib";

const pagesWithEvents = computed(() =>
  pages.value
    .map((page) => {
      if (page.eventid) {
        page.event = events.value.find(
          (event) => event.eventid === page.eventid
        );
      }
      return page;
    })
    .filter((event) => event.urgency !== "past")
);

const eventsWithPages = computed(() =>
  events.value
    .map((event) => {
      if (event.pageid) {
        event.page = pages.value.find((page) => page.pageid === event.pageid);
      }
      return event;
    })
    .filter((event) => event.urgency !== "past")
);

const countdown = useCountdown(config.perfStart);
const { centerX, centerY } = useWindow();
const pageStyle = (page) =>
  computed(() => ({
    left: `${parseFloat(page.x) + centerX.value}px`,
    top: `${parseFloat(page.y) + centerY.value}px`,
  }));
</script>
<template>
  <div>
    <!-- <Horizontal>
      &nbsp;
      <Vertical style="padding: 60px 0; gap: 32px">
        <EventCard
          v-for="(event, i) in eventsWithPages"
          :key="i"
          :event="event"
          :description="false"
        />
      </Vertical>
    </Horizontal> -->
    <Link
      v-for="(page, i) in pagesWithEvents"
      :key="i"
      :src="
        page.link
          ? page.link
          : page.event?.eventid
          ? '/' + page.event?.eventid
          : '/page/' + page.pageid
      "
    >
      <Disc
        :key="i"
        :style="{
          ...pageStyle(page).value,
          transform: 'translate(-50%, -50%)',
          position: 'fixed',
          color: page.color !== '' ? page.color : 'var(--fg)',
          backgroundColor: page.background || 'var(--bglight)',
          backgroundImage: page.image
            ? 'url(' + page.image + ')'
            : page.event?.image
            ? 'url(' + page.event.image + ')'
            : '',
          backgroundSize: 'cover',
          textAlign: 'center',
          width: page.radius * 2 + 'px',
          height: page.radius * 2 + 'px',
          padding: '32px',
        }"
      >
        <h2>{{ page.title }}</h2>
        <p style="line-height: 1.3em" v-if="page.about">
          {{ page.about }}
        </p>
      </Disc>
    </Link>
    <div
      style="
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      "
    >
      <div style="display: grid; gap: 16px">
        <h1
          style="
            font-size: clamp(32px, 12vw, 100px);
            text-align: center;
            line-height: 1em;
            white-space: nowrap;
          "
        >
          eˉlektron
        </h1>
        <Social style="pointer-events: auto" />
      </div>
    </div>
  </div>
</template>
