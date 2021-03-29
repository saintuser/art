<script setup>
import { defineProps } from "vue";
defineProps({ event: { type: Object } });
</script>

<template>
  <div class="EventDate" v-if="event">
    {{ event.formattedDistance }}
    <span style="opacity: 0.6">
      {{ event.formattedFromDatetime }} → {{ event.formattedToDatetime }}
    </span>
  </div>
</template>

<style>
.EventDate {
  font-size: 0.9em;
}
</style>
