<script setup>
import { computed, ref } from "vue";
import {
  loadMessages,
  loadPages,
  loadEvents,
  refreshUsers,
  useUser,
  toggleTheme,
  config,
} from "./lib";

loadEvents();
loadMessages();
loadPages();
refreshUsers();

const eventsVisible = ref(false);

const { userName, onUserNameChange } = useUser();
</script>

<template>
  <div class="App">
    <Suspense>
      <RouterView v-slot="{ Component }">
        <Transition name="fade" appear>
          <component :is="Component" />
        </Transition>
      </RouterView>
    </Suspense>

    <div
      v-if="config.newFeatures"
      style="position: fixed; right: 16px; top: 16px; display: flex"
    >
      <Button @click="toggleTheme">Theme</Button>
    </div>
    <Transition name="fade">
      <div v-if="eventsVisible" class="EventsWrapper">
        <Events />
      </div>
    </Transition>

    <Users />
  </div>
</template>

<style>
.App {
  min-height: 100vh;
}
</style>
