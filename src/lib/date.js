import {
  compareDesc,
  differenceInMinutes,
  format,
  formatDistanceStrict,
} from 'date-fns';

import { sentencecase } from './';

const timezoneShortname = (date) => {
  let dateString = date + "",
    tz =
      dateString.match(/\(([^\)]+)\)$/) ||
      dateString.match(/([A-Z]+) [\d]{4}$/);

  if (tz) {
    // @ts-ignore
    tz = tz[1].match(/[A-Z]/g).join("");
  }

  if (!tz && /(GMT\W*\d{4})/.test(dateString)) {
    return RegExp.$1;
  }

  return tz;
};

export const createDate = (dateStr, timeStr = "00:00", tz = "+02:00") =>
  new Date(`${dateStr}T${timeStr}:00.000${tz}`);

const isDatetime = (str) => String(str).match(/:/g);

const now = new Date();

export const formatDate = (str, fromTime = true) => {
  if (fromTime) {
    return `${format(new Date(str), "d. MMMM y HH:mm")} ${timezoneShortname(
      now
    )}`;
  } else {
    return format(new Date(str), "d. MMM y");
  }
};

export const sortEvents = (a, b) => compareDesc(b.fromDatetime, a.fromDatetime);

const dateRangeUrgency = (fromDatetime, toDatetime) => {
  const soonMinutes = 3 * 60;
  const started = differenceInMinutes(fromDatetime, now);
  const ended = differenceInMinutes(toDatetime, now);
  if (started < 0 && ended >= 0) {
    return { urgency: "now", started, ended };
  } else if (started >= 0 && started <= soonMinutes) {
    return { urgency: "soon", started, ended };
  } else if (started >= 0 && started > soonMinutes) {
    return { urgency: "future", started, ended };
  } else {
    return { urgency: "past", started, ended };
  }
};

export const getDiff = (event) => {
  const { fromdate, fromtime, todate, totime } = event;

  const fromDate = fromdate;
  const fromTime = fromtime.trim() ? fromtime : "00:00";
  const toDate = todate.trim() ? todate : fromDate;
  const toTime = totime.trim() ? totime : "24:00";

  const fromDatetime = createDate(
    fromDate,
    fromTime,
    event.tz === "CEST" ? "+01:00" : "+02:00"
  );
  const formattedFromDatetime = formatDate(fromDatetime);

  const toDatetime = createDate(
    toDate,
    toTime,
    event.tz === "CEST" ? "+01:00" : "+02:00"
  );

  const formattedToDatetime = formatDate(toDatetime);

  const formatDistance = (datetime, datetimeStatus = null) => {
    // @TODO support start and end times
    const distance = sentencecase(
      formatDistanceStrict(datetime, now, {
        roundingMethod: "ceil",
        addSuffix: true,
      })
    );
    return datetimeStatus === "now" ? `Started ${distance}` : distance;
  };

  const { urgency } = dateRangeUrgency(fromDatetime, toDatetime);

  const formattedDistance = formatDistance(fromDatetime, urgency);

  return {
    fromDatetime,
    toDatetime,
    formattedFromDatetime,
    formattedToDatetime,
    urgency,
    formattedDistance,
  };
};
