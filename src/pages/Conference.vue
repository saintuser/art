<script setup>
import { computed } from "vue";
import { pages, events, activeTheme } from "../lib";

const params = { pageid: "hope" };

const page = computed(() => {
  let p = { content: "", events: [] };
  if (params.pageid && pages.value) {
    const currentConference = pages.value.find(
      (page) => page.pageid === params.pageid
    );
    if (currentConference) {
      p = currentConference;
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
    <PageDisc v-if="page" :page="page" />
    <div class="Conference">
      <div v-html="page.content" class="ConferenceContent" />
      <div class="EventCards">
        <EventCard v-for="(event, i) in page.events" :key="i" :event="event" />
      </div>
    </div>
  </div>
</template>

<style>
.Conference {
  padding: clamp(1.5rem, 5vw, 3rem);
  padding-top: clamp(5rem, 10vw, 10rem);
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: clamp(8px, 5vw, 64px);
}
@media (max-width: 800px) {
  .Conference {
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
.ConferenceContent {
  display: grid;
  grid-auto-rows: max-content;
  gap: clamp(8px, 1vw, 16px);
}
.ConferenceContent > * {
  grid-column: 1;
}
.ConferenceContent p {
  margin: 0;
}
.ConferenceContent a {
  text-decoration: underline;
}
.ConferenceContent hr {
  display: none;
}
.ConferenceContent img {
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
