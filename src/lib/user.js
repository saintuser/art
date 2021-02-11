import { watch } from "vue";

import {
  adjectives,
  animals,
  any,
  createMessage,
  randomId,
  socket,
  useLocalstorage,
} from "./index.js";

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
      socket.send(outgoingMessage);
    }
  );
  return { userId, userName, onUserNameChange };
};
