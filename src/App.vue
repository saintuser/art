<script setup>
import { ref, watch, watchEffect } from "vue";
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
  useAdmin,
  superuser,
  toBeUpdated,
  updated,
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

const { sendUpdate, beforeUpdate, runUpdate, runPostUpdate } = useAdmin();
</script>

<template>
  <div class="App">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" appear>
        <component :is="Component" />
      </Transition>
    </RouterView>

    <div style="position: fixed; right: 16px; top: 16px; display: flex">
      <Button v-if="superuser && !toBeUpdated && !updated" @click="sendUpdate"
        >Send update</Button
      >
      <Button v-if="toBeUpdated" @click="runUpdate" style="--fg: orange"
        >The site is has new version. Click to run the update</Button
      >
      <Button v-if="updated" @click="runPostUpdate" style="--fg: orange">
        Update run fine, now click to turn the volume back on
      </Button>
      &ensp;
      <IconDarkmode @click="toggleTheme" />
    </div>
    <Users v-if="showUsers" />
  </div>
</template>

<style>
.App {
  min-height: 100vh;
}
</style>
