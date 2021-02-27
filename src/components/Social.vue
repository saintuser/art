<script setup>
import { theme, config } from "../lib";
</script>

<template>
  <div class="Social">
    <a v-if="config.facebookUrl" :href="config.facebookUrl" target="_blank">
      <IconFacebook />
    </a>
    <a v-if="config.instagramUrl" :href="config.instagramUrl" target="_blank">
      <IconInstagram />
    </a>
    <a v-if="config.twitterUrl" :href="config.twitterUrl" target="_blank">
      <IconTwitter />
    </a>
    <a v-if="config.youtubeUrl" :href="config.youtubeUrl" target="_blank">
      <IconYoutube />
    </a>
  </div>
</template>

<style scoped>
.Social {
  display: flex;
  gap: 8px;
}
.Social > a {
  display: grid;
  place-items: center;
  background: v-bind("theme.fg");
  color: v-bind("theme.bg");
  width: 48px;
  height: 48px;
  border-radius: 10000px;
}
.Social > a > svg {
  transform: scale(1.4);
}
</style>
