<script setup>
import { computed } from "vue";
import { useRoute, onBeforeRouteLeave } from "vue-router";
import { pages, events, activeTheme } from "../lib";

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

// onBeforeRouteLeave(() => {
//   if (page.value && page.value.theme === "light") {
//     activeTheme.value = 0;
//   }
// });
</script>

<template>
  <div>
    <Disc
      :style="{
        position: 'absolute',
        top: '-150px',
        left: '100px',
        backgroundColor: page.background,
        backgroundImage: page.image ? 'url(' + page.image + ')' : '',
        backgroundSize: 'cover',
        color: 'white',
        textAlign: 'center',
        width: '400px',
        height: '400px',
        pointerEvents: 'none',
        zIndex: -1000,
      }"
    />
    <div class="Page">
      <div v-html="page.content" class="PageContent" />
      <div class="EventCards">
        <EventCard v-for="(event, i) in page.events" :key="i" :event="event" />
      </div>
    </div>

    <ButtonBack />
  </div>
</template>

<style>
.Page {
  padding: clamp(1.5rem, 5vw, 3rem);
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

.PageContent {
  display: grid;
  grid-auto-rows: max-content;
  gap: clamp(8px, 1vw, 16px);
}
.PageContent > * {
  grid-column: 1;
}
.PageContent p {
  margin: 0;
}
.PageContent a {
  text-decoration: underline;
}
.PageContent hr {
  display: none;
}
.PageContent img {
  width: 100%;
  display: block;
  grid-column: ;
}
.EventCards {
  display: grid;
  grid-auto-rows: max-content;
  gap: 32px;
  padding-top: clamp(0.5rem, 1.2vw, 2rem);
}
</style>
