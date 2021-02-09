import { ref } from "vue";
import { config, useLocalstorage } from "./index.js";
import { getSheet } from "./sheet.js";

const events = useLocalstorage("ELEKTRON_EVENTS", []);

export const useEvents = () => {
  // fetch(config.eventsUrl)
  //   .then((res) => res.json())
  //   .then(({ items }) => (events.value = items?.[0]?.summary + Math.random()));
  getSheet(config.eventsUrl).then(({ title, rows }) => (events.value = rows));
  return events;
};
