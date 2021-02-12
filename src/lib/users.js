import { onMounted, onUnmounted, watch, ref } from "vue";
import { tryOnMounted, tryOnUnmounted } from "@vueuse/core";

import {
  adjectives,
  animals,
  any,
  createMessage,
  randomId,
  ws,
  useLocalstorage,
  safeJsonParse,
} from "../lib";

const interval = ref(null);

export const useUser = () => {
  const initialUserId = randomId();
  const initialUserName = `${any(adjectives)} ${any(animals)}`;

  const userId = useLocalstorage("elektron_user_id", initialUserId);
  const userName = useLocalstorage("elektron_user_name", initialUserName);

  const onUserNameChange = () => {
    const newName = window.prompt("Enter your name", userName.value);
    if (newName) {
      userName.value = newName;
    }
  };

  watch(
    () => userName.value,
    () => {
      const outgoingMessage = createMessage({
        type: "USER",
        userId: userId.value,
        value: { userName: userName.value },
      });
      ws.send(outgoingMessage);
    }
  );

  // tryOnMounted(() => {
  //   const outgoingMessage = createMessage({
  //     type: "USER",
  //   });
  //   ws.send(outgoingMessage);

  //   if (!interval.value) {
  //     interval.value = setInterval(() => {
  //       const outgoingMessage = createMessage({
  //         type: "USER",
  //       });
  //       ws.send(outgoingMessage);
  //     }, config.userIdle);
  //   }
  // });

  // tryOnUnmounted(() => clearInterval(interval.value));

  return { userId, userName, onUserNameChange };
};

export const users = ref([]);

export const updateUsers = () => {
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
};
