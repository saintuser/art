<script setup>
import { defineProps } from "vue";
defineProps({ event: { type: Object } });
</script>

<template>
  <div class="EventDate" v-if="event.from">
    {{ event.from }} {{ event.to ? "→" : "" }} {{ event.to }}
  </div>
</template>

<style>
.EventDate {
  font-size: 0.9em;
  opacity: 0.8;
}
</style>
