import { createApp, h } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import * as components from "./components/index.js";

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

const app = createApp({});
app.use(router);

Object.entries(components).forEach(([name, component]) =>
  app.component(name, component)
);

app.mount("#app");
