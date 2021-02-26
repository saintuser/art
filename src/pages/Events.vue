<script setup>
import { events } from "../lib";
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
