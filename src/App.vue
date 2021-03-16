<script setup>
import { computed, ref } from "vue";
import {
  loadMessages,
  loadPages,
  loadEvents,
  refreshUser,
  refreshUsers,
  toggleTheme,
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
      style="position: fixed; right: 16px; top: 16px; display: flex"
    >
      <Button @click="toggleTheme">◑</Button>
    </div>
    <Users />
  </div>
</template>

<style>
.App {
  min-height: 100vh;
}
</style>
