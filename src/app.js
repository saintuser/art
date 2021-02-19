import { createApp, h } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import * as components from "./components";

import App from "./App.vue";

const routes = [
  {
    path: "/",
    component: () => import("./pages/Index.vue"),
  },
  {
    path: "/events",
    component: () => import("./pages/Events.vue"),
  },
  {
    path: "/chat",
    component: () => import("./pages/Chat.vue"),
  },
  {
    path: "/live",
    component: () => import("./pages/Live.vue"),
  },
  {
    path: "/page/:slug",
    component: () => import("./pages/Page.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

Object.entries(components).forEach(([name, component]) =>
  app.component(name, component)
);

app.mount("#app");
