import { createApp, h } from "vue";
import { createRouter, createWebHistory, RouterView } from "vue-router";

import * as components from "./components/index.js";
import "./app.css";

const routes = [
  {
    path: "/",
    component: () => import("./pages/Index.vue"),
  },
  {
    path: "/videostream-example",
    component: () => import("./pages/VideoStreamExample.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp({
  setup() {
    return () => h(RouterView);
  },
});

app.use(router);

Object.entries(components).forEach(([name, component]) =>
  app.component(name, component)
);

app.mount("#app");
