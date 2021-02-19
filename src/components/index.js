import { defineAsyncComponent } from "vue";

export const Disc = defineAsyncComponent(() => import("./Disc.vue"));
export const Dot = defineAsyncComponent(() => import("./Dot.vue"));
export const Draggable = defineAsyncComponent(() => import("./Draggable.vue"));
export const EventCard = defineAsyncComponent(() => import("./EventCard.vue"));
export const Parallax = defineAsyncComponent(() => import("./Parallax.vue"));
export const Users = defineAsyncComponent(() => import("./Users.vue"));
export const VideoStream = defineAsyncComponent(() =>
  import("./VideoStream.vue")
);
