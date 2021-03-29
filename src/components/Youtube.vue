<script setup>
import { defineProps } from "vue";
import { replaceYoutube } from "../lib";
import "@justinribeiro/lite-youtube";
defineProps({
  src: { type: String },
});
</script>
<template>
  <div v-html="replaceYoutube(src)" />
</template>
