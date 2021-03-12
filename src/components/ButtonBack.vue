<script setup>
import { defineProps } from "vue";

const props = defineProps({ to: { type: String, default: "/" } });
</script>

<template>
  <div style="position: fixed; left: 16px; top: 16px">
    <RouterLink :to="to"><Button>‹</Button></RouterLink>
  </div>
</template>
