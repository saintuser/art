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

    <div style="position: fixed; right: 16px; top: 16px; display: flex">
      <Button @click="toggleTheme">◑</Button>
    </div>
    <div style="position: fixed; left: 16px; bottom: 16px">
      <div
        style="display: flex; justify-content: space-between; font-size: 0.7em"
      >
        <div style="opacity: 0.5; line-height: 1em">{{ userName }}:</div>
        <div @click="onUserNameChange" style="cursor: pointer">
          Change your name
        </div>
      </div>
      <input
        v-model="userAbout"
        style="width: 300px"
        placeholder="Write here a message"
      />
    </div>
    <Users />
  </div>
</template>

<style>
.App {
  min-height: 100vh;
}
</style>
