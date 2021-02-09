import { ref } from "vue";
import { sleep, config, fetchJson, useLocalstorage } from "./index.js";

const events = useLocalstorage("ELEKTRON_EVENTS", []);

export const useEvents = () => {
  fetchJson(config.eventsUrl).then(
    ({ items }) => (events.value = items?.[0]?.summary + Math.random())
  );
  return events;
};
