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
      <!-- <EventCard v-for="(event, i) in page.events" :key="i" :event="event" /> -->
      <div style="position: fixed; left: 16px; top: 16px">
        <RouterLink to="/"><Button>‹ elektron.art</Button></RouterLink>
      </div>
    </div>
  </Transition>
</template>

<style>
.title {
  margin: 0 0 32px 9;
  font-family: "font-medium", sans-serif;
  font-size: clamp(3rem, 5vw, 5rem);
  line-height: 1.2em;
  word-wrap: break-word;
}
.title > * {
  font-weight: normal !important;
  font-style: normal !important;
}
.subtitle {
  font-size: 1.6em;
  line-height: 1.5em;
}
.c5 {
  font-weight: bold;
}

.wrapper {
  padding: clamp(1rem, 3vw, 2rem);
  padding-top: clamp(5rem, 10vw, 10rem);
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
.wrapper a {
  text-decoration: underline;
}
.wrapper img {
  width: 100%;
  display: block;
}
.full-bleed {
  width: 100%;
  grid-column: 1 / 4;
}
</style>
