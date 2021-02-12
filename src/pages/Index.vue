<script setup>
import { sheet, calendar } from "../lib";
</script>

<template>
  <div>
    <router-link to="/">Index</router-link>&nbsp;
    <router-link to="/videostream-example">VideoStreamExample</router-link
    >&nbsp;
    <router-link to="/chat-example">ChatExample</router-link>
    <h1>elektron_live</h1>
    <h2>elektron_live</h2>
    <pre>{{ sheet }}</pre>
    <pre>{{ calendar.slice(0, 1) }}</pre>
  </div>
</template>
