const parseSheet = (data) => {
  const title = data.feed.title.$t;
  const rows = data.feed.entry.map((entry) => {
    return Object.keys(entry)
      .map((field) => {
        if (field.startsWith("gsx$")) {
          return [field.split("$")[1], entry[field].$t];
        }
      })
      .filter((field) => field)
      .reduce((field, item) => {
        field[item[0]] = item[1];
        return field;
      }, {});
  });
  return { title, rows };
};

export const getSheet = (url) => {
  //const id = url.match(/[-\w]{25,}/)?.[0];
  console.log(url);
  const id = "1uwpQmFojlB1NbVzllsPgu2NY3b-oFEmH2KA-vWbk7Nk";
  return fetch(
    `https://spreadsheets.google.com/feeds/list/${id}/od6/public/values?alt=json`
  )
    .then((res) => res.json())
    .then((res) => parseSheet(res));
};
