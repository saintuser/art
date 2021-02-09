import { ref } from "vue";
import { config, useLocalstorage } from "./index.js";
import { getSheet } from "./sheet.js";

const events = useLocalstorage("ELEKTRON_EVENTS", []);

export const useEvents = () => {
  getSheet(config.eventsUrl).then(({ title, rows }) => (events.value = rows));
  return events;
};
