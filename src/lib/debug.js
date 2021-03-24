import {
  ref,
  watch,
} from 'vue';

import { useRoute } from 'vue-router';

const debug = ref(false);

export const useDebug = () => {
  const route = useRoute();
  watch(
    () => route.query,
    () => (debug.value = route.query.hasOwnProperty("debug")),
    { immediate: true }
  );
  return debug;
};
