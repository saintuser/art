<script setup>
import { defineProps } from "vue";
defineProps({ event: { type: Object } });
</script>

<template>
  <h2>{{ event.title }}</h2>
  <p class="date" v-if="event.from">{{ event.from }} → {{ event.to }}</p>
  <div v-html="event.description" />
</template>

<style scoped>
.date {
  font-size: 0.9em;
  opacity: 0.8;
}
</style>
