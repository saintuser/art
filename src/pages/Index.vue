<script setup>
import { config, content, useCountdown } from "../lib";
const countdown = useCountdown(config.perfStart);
</script>
<template>
  <div>
    <RouterLink
      v-for="(page, i) in content"
      :key="i"
      :to="'/page/' + page.slug"
    >
      <Box
        :key="i"
        :style="{
          position: 'fixed',
          top: page.y + 'px',
          left: page.x + 'px',
          background: page.color,
          color: 'white',
          textAlign: 'center',
          width: page.width + 'px',
          height: page.height + 'px',
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
      </Box>
    </RouterLink>
    <div style="position: fixed; top: 300px; left: 280px">
      <h1
        style="
          font-size: 90px;
          text-align: center;
          line-height: 1em;
          pointer-events: none;
          white-space: nowrap;
        "
      >
        Welcome to<br />eˉlektron
      </h1>
    </div>
  </div>
</template>
