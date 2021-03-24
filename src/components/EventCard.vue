<script setup>
import { defineProps } from "vue";
defineProps({
  event: { type: Object },
  description: { type: Boolean, default: true },
});
</script>
<template>
  <RouterLink class="EventCard" :to="'/' + event.eventid">
    <component
      :is="event.fientaid ? 'icon-creditcard' : 'icon-stage'"
      :style="{ color: event.fientaid ? 'var(--ticket)' : '' }"
    />
    <div class="EventContent">
      <h3>{{ event.title }}</h3>
      <EventDate :event="event" />
      <Small style="opacity: 0.8" v-if="description">
        <Vertical class="EventIntro" v-html="event.description" />
      </Small>
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
}
.EventContent {
  display: grid;
  gap: 4px;
}
.EventIntro {
  opacity: 0.85;
  word-wrap: break-word;
}
</style>
