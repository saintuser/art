<script setup>
import { events } from "../lib";
</script>

<template>
  <div>
    <div class="EventsPanel">
      <EventCard v-for="(event, i) in events" :key="i" :event="event" />
    </div>
    <pre>{{ events }}</pre>
  </div>
</template>

<style>
.EventsPanel {
  background: var(--bg);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 300px;
  overflow: auto;
  padding: 72px 24px 24px 24px;
  opacity: 0.9;
  display: grid;
  gap: 16px;
  padding: 16px;
}
</style>
