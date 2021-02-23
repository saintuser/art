<script setup>
import { ref } from "vue";
import { fetchSheet, config } from "../lib";

const events = ref([]);

const createDate = (dateStr, timeStr, tz = "+02:00") =>
  new Date(`${dateStr}T${timeStr}${tz}`).toLocaleString("et", {
    timeZone: "Europe/Tallinn",
  });

const processEvent = (event) => {
  if (event.description) {
    event.intro = `${event.description.split(".")[0]}.`;
  }
  event.from = createDate(event.fromdate, event.fromtime);
  event.to = createDate(event.todate, event.totime);
  console.log(event.streamkey);
  if (event.streamkey) {
    event.streamkey = event.streamkey.split(",");
  }
  return event;
};
fetchSheet(config.eventsUrl).then(
  ({ rows }) => (events.value = rows.map(processEvent))
);
</script>

<template>
  <div>
    <div class="Events">
      <EventCard v-for="(event, i) in events" :key="i" :event="event" />
    </div>
    <pre>{{ events }}</pre>
  </div>
</template>

<style>
.Events {
  display: grid;
  gap: 16px;
  padding: 16px;
}
</style>
