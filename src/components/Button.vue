<script setup>
import { ref, computed } from "vue";

const theme = ref(0);
const colors = [
  { bg: "white", fg: "black" },
  { bg: "black", fg: "white" },
];
const color = computed(() => colors[theme.value]);
</script>

<template>
  <div class="Button"><slot /></div>
</template>

<style scoped>
.Button {
  display: inline-grid;
  align-items: center;
  border-radius: 100px;
  border: 2px solid black;
  padding: 0 8px;
  font-family: "Nunito Sans", sans-serif;
  font-size: 16px;
  font-weight: bold;
  height: 32px;
  background: none;
  outline: none;
  text-decoration: none;
  cursor: pointer;
  background: v-bind(color.bg);
  color: v-bind(color.fg);
}
</style>
