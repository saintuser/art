<script setup>
import { defineProps } from "vue";

defineProps({ color: { type: String, default: "black" } });
</script>

<template>
  <svg width="30" height="30">
    <circle cx="15" cy="15" r="15" :fill="color" />
  </svg>
</template>
