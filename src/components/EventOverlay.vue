<script setup>
import { defineProps } from "vue";
defineProps({ event: Object });
</script>
<template>
  <Overlay style="position: fixed">
    <h1>{{ event.title }}</h1>
    <div>This event has not yet started.</div>
    <div>
      <a v-if="event.moreinfo" :href="event.moreinfo">
        <Button>More info →</Button>
      </a>
      &ensp;
      <a :href="event.tickets">
        <Button>Get tickets →</Button>
      </a>
    </div>
  </Overlay>
</template>
