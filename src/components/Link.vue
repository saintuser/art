<script setup>
import { defineProps, toRefs, computed } from "vue";

const props = defineProps({ src: { type: String } });
const { src } = toRefs(props);

const componentType = computed(() =>
  src.value.startsWith("http") ? "a" : "router-link"
);
</script>

<template>
  <a v-if="componentType === 'a'" :href="src" target="_blank"><slot /></a>
  <RouterLink v-if="componentType === 'router-link'" :to="src"
    ><slot
  /></RouterLink>
</template>
