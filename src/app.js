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

const components = import.meta.glob("./components/*.vue");

const routes = [
  {
    path: "/",
    component: () => import("./pages/Index.vue"),
  },
  {
    path: "/users",
    component: () => import("./pages/Users.vue"),
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
