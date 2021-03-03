<script setup>
import { computed, ref } from "vue";
import {
  loadMessages,
  loadPages,
  loadEvents,
  refreshUsers,
  useUser,
  theme,
  toggleTheme,
  activeTheme,
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
    <RouterView v-slot="{ Component }">
      <Transition name="fade" appear>
        <component :is="Component" />
      </Transition>
    </RouterView>

    <Transition name="fade">
      <div v-if="eventsVisible" class="EventsWrapper">
        <Events />
      </div>
    </Transition>

    <template v-if="config.newFeatures">
      <div
        style="position: fixed; right: 16px; top: 16px; display: flex; gap: 8px"
      >
        {{ userName }}&nbsp;<Button @click="onUserNameChange">Change</Button>
        <Button @click="toggleTheme"> ◑ </Button>
      </div>

      <div style="position: fixed; left: 16px; bottom: 16px">
        <Button @click="eventsVisible = !eventsVisible">Menu</Button>
      </div>
    </template>

    <Users />
  </div>
</template>

<style>
.App {
  background: v-bind("theme.bg");
  color: v-bind("theme.fg");
  min-height: 100vh;
  transition: background 1s;
}
.EventsWrapper {
  background: v-bind("theme.bg");
  color: v-bind("theme.fg");
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 300px;
  overflow: auto;
  padding: 72px 24px 24px 24px;
  opacity: 0.9;
}
</style>
