//@ts-check
import { ref, watchEffect } from "vue";
import { config, fetchSheet, useLocalstorage } from ".";
import { fetchDoc } from "./doc";

export const content = ref([]);

export const loadContent = () => {
  console.log("load");
  fetchSheet(config.indexUrl).then(({ rows }) => {
    content.value = rows;
    // We fetch each Google doc and add them to content collection
    // Docs do not have to arrive in the same time so we do not
    // neet to use Promise.all()
    rows.forEach((row, i) => {
      fetchDoc(row.publicurl).then(
        (res) => (content.value[i].content = res.content)
      );
    });
  });
};
