<script setup>
import { computed } from "vue";
import { config, pages, useCountdown, useWindow } from "../lib";

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
    <RouterLink v-for="(page, i) in pages" :key="i" :to="'/page/' + page.slug">
      <Disc
        :key="i"
        :style="{
          ...pageStyle(page).value,
          transform: 'translate(-50%, -50%)',
          position: 'fixed',
          background: page.color,
          color: 'white',
          textAlign: 'center',
          width: page.radius * 2 + 'px',
          height: page.radius * 2 + 'px',
        }"
      >
        <h2>{{ page.title }}</h2>
        <p
          style="line-height: 1.3em"
          v-if="page.about && page.slug !== 'festival'"
        >
          {{ page.about }}
        </p>
        <p v-if="page.slug === 'festival'">
          {{ countdown.join("&nbsp;") + " to go" }}
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
      <h1
        style="
          font-size: clamp(32px, 10vw, 90px);
          text-align: center;
          line-height: 1em;
          white-space: nowrap;
        "
      >
        Welcome to<br />eˉlektron
      </h1>
    </div>
  </div>
</template>
