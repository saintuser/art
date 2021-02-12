<template>
  Hello {{ events }}
  <router-link to="/videostream-example">VideoStreamExample</router-link>
  <router-link to="/chat-example">ChatExample</router-link>
</template>

<script setup>
import { useEvents } from "../lib/index.js";
const events = useEvents();
</script>
