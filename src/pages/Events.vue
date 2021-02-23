<script setup>
import { ref } from "vue";
import { events, fetchSheet, config } from "../lib";
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
