<script setup>
import { defineProps } from "vue";
defineProps({ page: { type: Object } });
</script>

<template>
  <Disc
    :style="{
      position: 'absolute',
      top: '-150px',
      left: '100px',
      backgroundColor: page?.background,
      backgroundImage: page?.image ? 'url(' + page.image + ')' : '',
      backgroundSize: 'cover',
      color: 'white',
      textAlign: 'center',
      width: '400px',
      height: '400px',
      pointerEvents: 'none',
      zIndex: -1000,
    }"
  />
</template>
