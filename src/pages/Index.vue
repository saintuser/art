<template>
  Hello {{ events }}
  <router-link to="/videostream-example">VideoStream</router-link>
</template>

<script setup>
import { useEvents } from "../lib/index.js";
const events = useEvents();
console.log(events.value);
</script>
