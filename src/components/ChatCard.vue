<script setup>
defineProps({ chat: { type: Object } });
</script>

<template>
  <Vertical style="gap: 4px">
    <Smaller style="opacity: 0.5">
      {{ chat.userName }}
    </Smaller>
    <Small
      style="border: 2px solid var(--fgdark); border-radius: 4px; padding: 12px"
    >
      {{ chat.value }}
    </Small>
  </Vertical>
</template>
