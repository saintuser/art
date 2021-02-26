<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { pages, events } from "../lib";

const { params } = useRoute();

// @TODO: Simplify
const page = computed(() => {
  let p = { content: "", events: [] };
  if (params.pageid && pages.value) {
    const currentPage = pages.value.find(
      (page) => page.pageid === params.pageid
    );
    if (currentPage) {
      p = currentPage;
    }
    if (events.value) {
      p.events = events.value.filter((event) => event.pageid == params.pageid);
    }
  }
  return p;
});
</script>

<template>
  <Transition name="fade">
    <div>
      <div v-if="page" v-html="page.content" class="wrapper" />
      <EventCard v-for="(event, i) in page.events" :key="i" :event="event" />
    </div>
  </Transition>
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
