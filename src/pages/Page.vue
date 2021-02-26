<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { pages } from "../lib";

const { params } = useRoute();
const page = computed(() => {
  if (params.link && pages.value) {
    const page = pages.value.find((page) => page.link === params.link);
    return page?.content ?? null;
  }
  return null;
});
</script>

<template>
  <Transition name="fade">
    <div v-if="page" v-html="page" class="wrapper"
  /></Transition>
</template>

<style>
.title {
  margin: 0;
  font-family: "font-medium", sans-serif;
  font-size: 4em;
  line-height: 1em;
}
.title > * {
  font-weight: normal !important;
  font-style: normal !important;
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
