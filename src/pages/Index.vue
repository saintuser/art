<script setup>
import { computed } from "vue";
import { config, pages, events, useCountdown, useWindow } from "../lib";

const pagesWithEvents = computed(() =>
  pages.value.map((page) => {
    if (page.eventid) {
      page.event = events.value.find((event) => event.eventid === page.eventid);
    }
    return page;
  })
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
    <RouterLink
      v-for="(page, i) in pagesWithEvents"
      :key="i"
      :to="
        page.event?.eventid ? '/' + page.event?.eventid : '/page/' + page.pageid
      "
    >
      <Disc
        :key="i"
        :style="{
          ...pageStyle(page).value,
          transform: 'translate(-50%, -50%)',
          position: 'fixed',
          backgroundColor: page.color,
          backgroundImage: page.image
            ? 'url(' + page.image + ')'
            : page.event?.image
            ? 'url(' + page.event.image + ')'
            : '',
          backgroundSize: 'cover',
          color: 'white',
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
    </RouterLink>
    <div
      style="
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: grid;
        place-items: center;
        pointer-events: none;
      "
    >
      <div style="display: grid; place-items: center; gap: 16px">
        <h1
          style="
            font-size: clamp(32px, 10vw, 90px);
            text-align: center;
            line-height: 1em;
            white-space: nowrap;
          "
        >
          Welcome to<br />eˉlektron
          <br />
        </h1>
        <Social style="pointer-events: auto" />
      </div>
    </div>
  </div>
</template>
