<script setup>
import { defineProps } from "vue";
defineProps({ event: Object });
</script>

<template>
  <div>
    <IconStage style="transform: scale(4); color: var(--ticket)" />
    <p />
    <div>This event has not yet started but you can already enter.</div>
    <slot />
    <a
      v-if="event.tickets"
      :href="event.tickets"
      style="border-bottom: 1px solid var(--fg)"
    >
      No tickets yet? Get them here
    </a>
    <p style="opacity: 0.5">Having problems? Write us at help@elektron.art</p>
  </div>
</template>
