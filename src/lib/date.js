import { ref } from "vue";
import { intervalToDuration } from "date-fns";

export const useCountdown = (initialDate) => {
  const duration = ref([]);

  const formatDuration = (duration) => {
    const durationMap = {
      months: "m",
      days: "d",
      hours: "h",
      minutes: "m",
      seconds: "s",
    };
    const formattedDuration = Object.entries(duration)
      .map(([key, value]) =>
        durationMap[key] ? `${value}${durationMap[key]}` : null
      )
      .filter((value) => value);
    return formattedDuration;
  };

  setInterval(
    () =>
      (duration.value = formatDuration(
        intervalToDuration({
          start: new Date("2021-04-01T18:00:00.002Z"),
          end: new Date(),
        })
      )),
    1000
  );

  return duration;
};
