<template>
  <h1>elektron_live</h1>
  <h2>elektron_live</h2>
  Hello {{ events }}
  <router-link to="/videostream-example">VideoStreamExample</router-link>
  <router-link to="/chat-example">ChatExample</router-link>
</template>

<script setup>
import { useEvents } from "../lib/index.js";
const events = useEvents();
</script>
