<script setup>
import { config, users } from "../lib/index.js";
</script>

<template>
  <div style="padding: 32px">
    <h1>Config</h1>
    <pre>{{ config }}</pre>
    <h1>Users</h1>
    <pre>{{ users.sort((a, b) => a.userId > b.userId) }}</pre>
  </div>
</template>
