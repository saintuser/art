<script setup>
import { content } from "../lib";
</script>
<template>
  <div>
    <RouterLink
      v-for="(page, i) in content"
      :key="i"
      :to="'/pages/' + page.slug"
    >
      <Box
        :key="i"
        :style="{
          position: 'fixed',
          top: page.y + 'px',
          left: page.x + 'px',
          background: page.color,
          color: 'white',
          padding: '110px',
        }"
      >
        {{ page.title }}
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
