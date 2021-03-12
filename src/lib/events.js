//@ts-check
import { ref } from 'vue';

import {
  config,
  fetchSheet,
} from './';

export const events = ref([]);

const createDate = (dateStr, timeStr, tz = "+02:00") =>
  new Date(`${dateStr}T${timeStr}${tz}`).toLocaleString("et", {
    timeZone: "Europe/Tallinn",
  });

const processEvent = (event) => {
  if (event.description) {
    event.intro = `${event.description.split(/\n/)[0]}.`;
    event.description = `<p>${event.description.replace(/\n/g, "</p><p>")}</p>`;
  }
  const fromDate = createDate(event.fromdate, event.fromtime);
  const toDate = createDate(event.todate, event.totime);
  event.from = fromDate !== "Invalid Date" ? fromDate : "";
  event.to = toDate !== "Invalid Date" ? toDate : "";
  if (event.streamkey) {
    event.streamkeys = event.streamkey.split(",").map((key) => key.trim());
  } else {
    event.streamkeys = [event.eventid];
  }
  return event;
};

export const loadEvents = () =>
  fetchSheet(config.eventsUrl).then(
    ({ rows }) => (events.value = rows.map(processEvent))
  );
