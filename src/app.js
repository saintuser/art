import { createApp, h } from "vue";
import { createRouter, createWebHistory, RouterView } from "vue-router";

import * as components from "./components";
import { fetchMessages, refreshUsers } from "./lib";

const routes = [
  {
    path: "/",
    component: () => import("./pages/Index.vue"),
  },
  {
    path: "/videostream-example",
    component: () => import("./pages/VideoStreamExample.vue"),
  },
  {
    path: "/chat-example",
    component: () => import("./pages/ChatExample.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp({
  setup() {
    fetchMessages();
    refreshUsers();
    return () => h(RouterView);
  },
});

app.use(router);

Object.entries(components).forEach(([name, component]) =>
  app.component(name, component)
);

app.mount("#app");
