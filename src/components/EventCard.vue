<script setup>
import { defineProps } from "vue";
defineProps({ event: { type: Object } });
</script>
<template>
  <RouterLink class="EventCard" :to="'/' + event.eventid">
    <IconStage />
    <div class="EventContent">
      <h3>{{ event.title }}</h3>
      <div class="EventDate" v-if="event.from">
        {{ event.from }} {{ event.to ? "→" : "" }} {{ event.to }}
      </div>
      <div class="EventIntro">{{ event.intro }}</div>
    </div>
  </RouterLink>
</template>

<style scoped>
.EventCard {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
}
.EventCard > .Icon {
  transform: scale(1.4) translateY(0.4ch);
  opacity: 0.5;
}
.EventContent {
  display: grid;
  gap: 4px;
}
.EventDate {
  font-size: 0.9em;
  opacity: 0.7;
}
.EventIntro {
  opacity: 0.85;
}
</style>
