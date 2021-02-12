<script setup>
import { useEvents } from "../lib/index.js";
const events = useEvents();
</script>

<template>
  <div>
    <router-link to="/">Index</router-link>&nbsp;
    <router-link to="/videostream-example">VideoStreamExample</router-link
    >&nbsp;
    <router-link to="/chat-example">ChatExample</router-link>
    <h1>elektron_live</h1>
    <h2>elektron_live</h2>
  </div>
</template>
