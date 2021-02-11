import { onMounted, onUnmounted, watch, ref } from "vue";

import {
  adjectives,
  animals,
  any,
  createMessage,
  randomId,
  ws,
  useLocalstorage,
  config,
} from ".";

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

  /*

  const interval = ref(null);

  onMounted(() => {
    interval.value = setInterval(() => {
      const outgoingMessage = createMessage({
        type: "USER",
        userId: userId.value,
      });
      //console.log(outgoingMessage);
      ws.send(outgoingMessage);
    }, config.idleFrequency);
  });

  onUnmounted(() => clearInterval(interval.value));
  */

  return { userId, userName, onUserNameChange };
};
