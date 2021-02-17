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
    path: "/chat-example",
    component: () => import("./pages/ChatExample.vue"),
  },
  {
    path: "/videostream-example",
    component: () => import("./pages/VideoStreamExample.vue"),
  },
  {
    path: "/counter-example",
    component: () => import("./pages/CounterExample.vue"),
  },
  {
    path: "/pages/:page",
    component: () => import("./pages/DocsExample.vue"),
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
