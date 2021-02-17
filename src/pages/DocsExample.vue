<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { content } from "../lib";

const { params } = useRoute();
const page = computed(() => {
  if (params.slug && content.value) {
    console.log(content.value);
    const page = content.value.find((page) => page.slug === params.slug);
    return page?.content ?? null;
  }
  return null;
});
</script>

<template>
  <RouterLink to="/" style="display: flex; justify-content: center"
    >Go back</RouterLink
  >
  <div v-html="page" class="wrapper" />
</template>

<style>
.title {
  margin: 0;
  font-family: "font-medium", sans-serif;
  font-size: 4em;
  line-height: 1em;
  font-weight: normal !important;
}

.subtitle {
  font-size: 1.75em;
  line-height: 1.5em;
}
.c3 .c2 {
  font-style: italic;
}
.c5 {
  font-weight: bold;
}

.wrapper {
  padding: clamp(1rem, 5vw, 3rem);
  display: grid;
  gap: 24px;
  grid-template-columns:
    1fr
    min(65ch, 100%)
    1fr;
}
.wrapper > * {
  grid-column: 2;
}
.wrapper p {
  margin: 0;
}
.full-bleed {
  width: 100%;
  grid-column: 1 / 4;
}
</style>
