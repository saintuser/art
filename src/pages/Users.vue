<script setup>
import { computed } from "vue";
import { users } from "../lib";

const updatedUsers = computed(() =>
  users.value
    .map((user) => {
      return user;
    })
    .sort((a, b) => a.userId.localeCompare(b.userId))
);
</script>

<template>
  <div style="padding: 32px">
    <h1>Users</h1>
    <pre>{{ updatedUsers }}</pre>
  </div>
</template>
