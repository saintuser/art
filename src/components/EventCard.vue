<script setup>
defineProps({ event: { type: Object } });
</script>
<template>
  <div class="EventCard">
    <IconYoutube />
    <RouterLink :to="'/' + event.eventid">
      <h3>{{ event.title }}</h3>
      <p class="date" v-if="event.from">
        {{ event.from }} {{ event.to ? "→" : "" }} {{ event.to }}
      </p>
      <p>{{ event.intro }}</p>
    </RouterLink>
  </div>
</template>

<style>
.EventCard {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
}
.EventCard .Icon {
  transform: scale(1.4) translateY(0.3ch);
  opacity: 0.5;
}
.date {
  font-size: 0.9em;
  opacity: 0.8;
}
</style>
