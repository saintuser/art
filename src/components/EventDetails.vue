<script setup>
defineProps({ event: { type: Object } });
</script>

<template>
  <h3>{{ event.title }}</h3>
  <p class="date" v-if="event.from">{{ event.from }} → {{ event.to }}</p>
  <div v-html="event.description" />
</template>

<style scoped>
.date {
  font-size: 0.9em;
  opacity: 0.8;
}
</style>
