<script setup>
import { computed } from "vue";
import { events, pages } from "../lib";

const eventsWithPages = computed(() =>
  events.value.map((event) => {
    if (event.pageid) {
      event.page = pages.value.find((page) => page.pageid === event.pageid);
    }
    return event;
  })
);
</script>

<template>
  <div>
    <Vertical style="padding: 64px; gap: 32px">
      <EventCard
        v-for="(event, i) in eventsWithPages"
        :key="i"
        :event="event"
        :description="false"
      />
    </Vertical>
    <ButtonBack />
  </div>
</template>
