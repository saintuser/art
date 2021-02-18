import { defineAsyncComponent } from "vue";

export const Box = defineAsyncComponent(() => import("./Box.vue"));
export const Dot = defineAsyncComponent(() => import("./Dot.vue"));
export const Draggable = defineAsyncComponent(() => import("./Draggable.vue"));
export const Parallax = defineAsyncComponent(() => import("./Parallax.vue"));
export const Users = defineAsyncComponent(() => import("./Users.vue"));
export const VideoStream = defineAsyncComponent(() =>
  import("./VideoStream.vue")
);
