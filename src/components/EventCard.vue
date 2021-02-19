<script setup>
defineProps({ event: { type: Object } });
</script>
<template>
  <RouterLink :to="'/event/' + event.streamkey[0]">
    <h3>{{ event.title }}</h3>
    <p class="date" v-if="event.from">{{ event.from }} → {{ event.to }}</p>
    <p>{{ event.intro }}</p>
  </RouterLink>
</template>

<style scoped>
.date {
  font-size: 0.9em;
  opacity: 0.8;
}
</style>
