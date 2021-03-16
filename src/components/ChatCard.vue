<script setup>
defineProps({ chat: { type: Object } });
</script>

<template>
  <div class="ChatCard">
    <div style="font-size: 0.8em; opacity: 0.5">
      {{ chat.userName }}
    </div>
    <div>{{ chat.value }}</div>
  </div>
</template>

<style scoped></style>
