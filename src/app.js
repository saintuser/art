import './app.css';

import {
  createApp,
  defineAsyncComponent,
} from 'vue';

import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import App from './App.vue';
import { config } from './lib';

const components = import.meta.glob("./components/*.vue");

const routes = [
  {
    path: "/",
    component: () => import(`./pages/${config.indexComponent}.vue`),
  },
  {
    path: "/threesixty",
    component: () => import("./pages/Threesixty.vue"),
  },
  {
    path: "/fienta",
    component: () => import("./pages/Fienta.vue"),
  },
  {
    path: "/test",
    component: () => import("./pages/Test.vue"),
  },
  {
    path: "/test2",
    component: () => import("./pages/Test2.vue"),
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

Object.entries(components).forEach(([path, component]) => {
  const name = path.match(/\.\/components\/(.*)\.vue$/)[1];
  app.component(name, defineAsyncComponent(component));
});

app.mount("#app");
