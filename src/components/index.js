import { defineAsyncComponent } from "vue";

export const VideoStream = defineAsyncComponent(() =>
  import("./VideoStream.vue")
);

export const Overlay = defineAsyncComponent(() => import("./Overlay.vue"));

export const Draggable = defineAsyncComponent(() => import("./Draggable.vue"));
