import { createApp, h } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import * as components from "./components";

import App from "./App.vue";
import "./app.css";

const routes = [
  {
    path: "/",
    component: () => import("./pages/Index.vue"),
  },
  {
    path: "/user",
    component: () => import("./pages/User.vue"),
  },
  {
    path: "/page/:pageid",
    component: () => import("./pages/Page.vue"),
  },
  {
    path: "/:eventid",
    component: () => import("./pages/Event.vue"),
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
