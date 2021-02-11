import { ref, onMounted, onUnmounted } from "vue";
import { merge } from "lodash";

import {
  ws,
  safeJsonParse,
  config,
  createMessage,
  useUser,
  uniqueCollection,
} from ".";

const users = ref([]);

export const useUsers = () => {
  const { userName } = useUser();

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

  const idleInteval = ref(null);

  onMounted(() => {
    idleInteval.value = setInterval(() => {
      const outgoingMessage = createMessage({
        type: "USER",
        value: { userName: userName.value },
      });
      ws.send(outgoingMessage);
    }, config.idleFrequency);
  });

  onUnmounted(() => clearInterval(idleInteval.value));

  return {
    users,
  };
};
