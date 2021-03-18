<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import {
  loadMessages,
  loadPages,
  loadEvents,
  refreshUser,
  refreshUsers,
  toggleTheme,
  activeTheme,
  config,
  userName,
  userAbout,
  onUserNameChange,
} from "./lib";

loadEvents();
loadMessages();
loadPages();
refreshUser();
refreshUsers();

const route = useRoute();
const showUsers = ref(false);
watch(
  () => route.matched,
  () => {
    showUsers.value = route.matched?.[0]?.path !== "/:eventid";
  },
  { immediate: true }
);
</script>

<template>
  <div class="App">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" appear>
        <component :is="Component" />
      </Transition>
    </RouterView>

    <div
      v-if="config.newFeatures"
      style="position: fixed; right: 12px; bottom: 12px; display: flex"
    >
      <IconSun v-if="!activeTheme" @click="toggleTheme" />
      <IconMoon v-if="activeTheme" @click="toggleTheme" />
    </div>
    <Users v-if="showUsers" />
  </div>
</template>

<style>
.App {
  min-height: 100vh;
}
</style>
