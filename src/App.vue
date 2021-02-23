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
    <div class="EventsWrapper">
      <Events />
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
  right: 0;
  top: 0;
  height: 50vh;
  width: 300px;
  overflow: auto;
}
</style>
