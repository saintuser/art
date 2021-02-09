import { defineAsyncComponent } from "vue";

export const VideoStream = defineAsyncComponent(() =>
  import("./VideoStream.vue")
);
