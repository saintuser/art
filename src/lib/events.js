//@ts-check
import { ref } from "vue";
import { config, fetchSheet } from ".";

export const events = ref([]);

const createDate = (dateStr, timeStr, tz = "+02:00") =>
  new Date(`${dateStr}T${timeStr}${tz}`).toLocaleString("et", {
    timeZone: "Europe/Tallinn",
  });

const processEvent = (event) => {
  if (event.description) {
    event.intro = `${event.description.split(".")[0]}.`;
  }
  event.from = createDate(event.fromdate, event.fromtime);
  event.to = createDate(event.todate, event.totime);
  if (event.streamkey) {
    event.streamkey = event.streamkey.split(",");
  }
  return event;
};

export const loadEvents = () =>
  fetchSheet(config.eventsUrl).then(
    ({ rows }) => (events.value = rows.map(processEvent))
  );
