import { defineAsyncComponent } from "vue";

export const Disc = defineAsyncComponent(() => import("./Disc.vue"));
export const Dot = defineAsyncComponent(() => import("./Dot.vue"));
export const Draggable = defineAsyncComponent(() => import("./Draggable.vue"));
export const Events = defineAsyncComponent(() => import("./Events.vue"));
export const EventCard = defineAsyncComponent(() => import("./EventCard.vue"));
// export const EventDetails = defineAsyncComponent({
//   loader: () => import("./EventDetails.vue"),
//   onError: (e) => console.log(e),
// });
export { default as EventDetails } from "./EventDetails.vue";
export const Parallax = defineAsyncComponent(() => import("./Parallax.vue"));
export const Users = defineAsyncComponent(() => import("./Users.vue"));
// export const VideoStream = defineAsyncComponent({
//   loader: () => import("./VideoStream.vue"),
//   onError: (e) => console.log(e),
// });
export { default as VideoStream } from "./VideoStream.vue";
