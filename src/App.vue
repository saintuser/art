<script setup>
import { computed, ref } from "vue";
import { loadMessages, loadPages, loadEvents, refreshUsers } from "./lib";

loadEvents();
loadMessages();
loadPages();
refreshUsers();

const theme = ref(0);
const colors = [
  { bg: "white", fg: "black" },
  { bg: "black", fg: "white" },
];
const color = computed(() => colors[theme.value]);

const eventsVisible = ref(false);
</script>

<template>
  <div class="App">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" appear>
        <component :is="Component" />
      </Transition>
    </RouterView>
    <div
      style="position: fixed; left: 16px; bottom: 16px; cursor: pointer"
      @click="theme = 1 - theme"
    >
      ◑
    </div>

    <Transition name="fade">
      <div v-if="eventsVisible" class="EventsWrapper">
        <Events />
      </div>
    </Transition>

    <div style="position: fixed; left: 16px; top: 16px">
      <RouterLink class="button" to="/">❮</RouterLink>
      <button @click="eventsVisible = !eventsVisible">≡</button>
    </div>

    <Users />
  </div>
</template>

<style>
.App {
  background: v-bind("color.bg");
  color: v-bind("color.fg");
  min-height: 100vh;
  transition: background 1s;
}
.EventsWrapper {
  background: v-bind("color.bg");
  color: v-bind("color.fg");
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
