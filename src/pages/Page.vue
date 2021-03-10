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
  <div>
    <Disc
      :style="{
        position: 'absolute',
        top: '-150px',
        left: '100px',
        backgroundColor: page.color,
        backgroundImage: page.image ? 'url(' + page.image + ')' : '',
        backgroundSize: 'cover',
        color: 'white',
        textAlign: 'center',
        width: '600px',
        height: '600px',
        pointerEvents: 'none',
        zIndex: -1000,
      }"
    />
    <div class="Page">
      <div v-html="page.content" class="wrapper" />
      <div>
        <EventCard v-for="(event, i) in page.events" :key="i" :event="event" />
      </div>
    </div>

    <ButtonBack />
  </div>
</template>

<style>
.Page {
  padding: clamp(1.5rem, 3vw, 2rem);
  padding-top: clamp(5rem, 10vw, 10rem);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(8px, 5vw, 64px);
}
@media (max-width: 800px) {
  .Page {
    grid-template-columns: 1fr;
  }
}
.title {
  margin: 0 0 32px 9;
  font-family: "font-medium", sans-serif;
  font-size: clamp(2.5rem, 5vw, 5rem);
  line-height: 1.2em;
  word-wrap: break-word;
}
.title > * {
  font-weight: normal !important;
  font-style: normal !important;
}
.subtitle {
  font-size: clamp(1.25rem, 2vw, 3rem);
  line-height: 1.5em;
}
.c5 {
  font-weight: bold;
}

.wrapper {
  /* padding: clamp(1.5rem, 3vw, 2rem);
  padding-top: clamp(5rem, 10vw, 10rem);
  display: grid;
  /* gap: clamp(8px, 3vw, 16px) 0; */
}

.wrapper > * {
  grid-column: 1;
}
.wrapper p {
  margin: 0;
}
.wrapper a {
  text-decoration: underline;
}
.wrapper hr {
  display: none;
}
.wrapper img {
  width: 100%;
  display: block;
  grid-column: ;
}
.full-bleed {
  width: 100%;
  grid-column: 1 / 4;
}
</style>
