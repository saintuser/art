<script setup>
import { defineProps } from "vue";

const props = defineProps({ to: { type: String, default: "/" } });
</script>

<template>
  <div style="position: fixed; left: 10px; top: 10px">
    <RouterLink :to="to"><IconLeft /></RouterLink>
  </div>
</template>
