export const config = {
  streamUrl: import.meta.env.VITE_STREAM_URL || "",
  calendarUrl: import.meta.env.VITE_CALENDAR_URL || "",
  sheetUrl: import.meta.env.VITE_SHEET_URL || "",
  wsUrl: import.meta.env.VITE_WS_URL || "",
  historyUrl: import.meta.env.VITE_HISTORY_URL || "",
  userIdle: 10000,
  messageDelay: 20,
};
