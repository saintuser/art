<script setup>
import { computed, ref } from "vue";
import { useParallax } from "@vueuse/core";

const parallaxRef = ref(null);
const { tilt, roll } = useParallax(parallaxRef);

const style = computed(() => ({
  transform: `rotateX(${roll.value * 20}deg) rotateY(${tilt.value * 20}deg)`,
}));
</script>

<template>
  <div ref="parallaxRef" :style="style">
    <slot />
  </div>
</template>
