<script setup>
import { ref } from "vue";
import { fetchMessages, refreshUsers } from "./lib";
import { Overlay } from "./components";

fetchMessages();
refreshUsers();
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade" appear>
      <component :is="Component" />
    </Transition>
  </RouterView>
  <Overlay />
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
</style>
