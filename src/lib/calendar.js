import { config, useLocalstorage } from "./index.js";

export const calendar = useLocalstorage("elektron_calendar", []);

export const loadCalendar = () => {
  fetch(config.calendarUrl)
    .then((res) => res.json())
    .then(({ items }) => (calendar.value = items));
};
