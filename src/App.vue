<script setup>
import { computed, ref } from "vue";
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

const eventsVisible = ref(false);
</script>

<template>
  <div class="App">
    <!-- <Suspense> -->
    <RouterView v-slot="{ Component }">
      <Transition name="fade" appear>
        <component :is="Component" />
      </Transition>
    </RouterView>
    <!-- </Suspense> -->

    <div
      v-if="config.newFeatures"
      style="position: fixed; right: 12px; top: 12px; display: flex"
    >
      <IconSun v-if="!activeTheme" @click="toggleTheme" />
      <IconMoon v-if="activeTheme" @click="toggleTheme" />
    </div>
    <Users />
  </div>
</template>

<style>
.App {
  min-height: 100vh;
}
</style>
