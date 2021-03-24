import { ref, watch } from "vue";

import { useRoute } from "vue-router";

const debug = ref(false);
const admin = ref(false);

export const useFeatures = () => {
  const route = useRoute();
  watch(
    () => route.query,
    () => {
      debug.value = route.query.hasOwnProperty("debug");
      admin.value = route.query.hasOwnProperty("admin"); // @TODO use admin key
    },
    { immediate: true }
  );
  return { debug, admin };
};
