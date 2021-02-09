import { ref } from "vue";
import { sleep, useJson } from "./index.js";

const events = ref([]);

export const useEvents = () => {
  sleep(2000).then((_) => (events.value = ["hello"]));
  return events;
};
