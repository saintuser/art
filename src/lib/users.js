import { ref, onMounted, onUnmounted } from "vue";
import { merge } from "lodash";

import { ws, safeJsonParse } from ".";

const users = ref([]);

export const useUsers = () => {
  ws.addEventListener("message", ({ data }) => {
    const message = safeJsonParse(data);
    if (message?.type === "USER") {
      const index = users.value
        .reverse()
        .findIndex((u) => message.userId === u.userId);
      if (index > -1) {
        users.value[index] = merge(users.value[index], message, {});
      } else {
        users.value = [...users.value, message];
      }
    }
  });

  return {
    users,
  };
};
