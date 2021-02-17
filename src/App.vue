<script setup>
import { computed, ref } from "vue";
import { loadMessages, loadSheet, loadCalendar, refreshUsers } from "./lib";
import { Overlay } from "./components";

loadMessages();
loadSheet();
loadCalendar();
refreshUsers();

const theme = ref(0);
const colors = [
  { bg: "black", fg: "white" },
  { bg: "white", fg: "black" },
];
const color = computed(() => colors[theme.value]);
</script>

<template>
  <div class="App">
    <div
      style="position: fixed; left: 16px; bottom: 16px; cursor: pointer"
      @click="theme = 1 - theme"
    >
      ⬤
    </div>
    <RouterView v-slot="{ Component }">
      <Transition name="fade" appear>
        <component :is="Component" />
      </Transition>
    </RouterView>
    <Overlay />
  </div>
</template>

<style>
@font-face {
  font-family: "font-medium";
  src: url("/fonts/font-medium.woff") format("woff"),
    url("/fonts/font-medium.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "font-medium-oblique";
  src: url("/fonts/font-medium-oblique.woff") format("woff"),
    url("/fonts/font-medium-oblique.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: "Nunito Sans", sans-serif;
  font-size: 18px;
  line-height: 1.65em;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  font-family: "font-medium", sans-serif;
  line-height: 1.5em;
}

/* Transitions */

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Other */

[v-cloak] {
  display: none;
}

.App {
  background: v-bind("color.bg");
  color: v-bind("color.fg");
  min-height: 100vh;
}
</style>
