import {
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue';

export const useChatTextarea = (callback = () => {}) => {
  const el = ref(null);

  const onKeydown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      callback();
      el.value.style.height = "auto";
    }
  };

  const onInput = (e) => {
    el.value.style.height = "auto";
    el.value.style.height = el.value.scrollHeight + "px";
  };

  onMounted(() => {
    if (el.value) {
      //el.value.focus();
      el.value.addEventListener("keydown", onKeydown);
      // @TODO Run when event exists
      onInput();
      el.value.addEventListener("input", onInput);
    }
  });

  onUnmounted(() => {
    if (el.value) {
      el.value.removeEventListener("keydown", onKeydown);
      el.value.removeEventListener("input", onInput);
    }
  });

  return el;
};

export const useAboutTextarea = (visible) => {
  const el = ref(null);

  // const onKeydown = (e) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     e.preventDefault();
  //     callback();
  //     el.value.style.height = "auto";
  //   }
  // };

  const onInput = (e) => {
    // el.value.style.height = "auto";
    // el.value.style.height = el.value.scrollHeight + "px";
  };

  // nextTick(() => {
  //   console.log("a");
  //   el.value.focus();
  //   el.value.select();
  // });

  watch(
    [() => el.value, () => visible.value],
    () => {
      if (el.value && visible.value) {
        console.log(el.value, visible.value);
        // el.value.focus();
        // el.value.select();
        nextTick(() => {
          el.value.focus();
          el.value.select();
        });
      }
    },
    { immediate: true }
  );
  /*
  onMounted(() => {
    if (el.value) {
      //      nextTick(() => {
      el.value.focus();
      el.value.select();
      //    });
      // el.value.focus();
      // el.value.select();
      //el.value.focus();
      //el.value.addEventListener("keydown", onKeydown);
      // @TODO Run when event exists
      //el.value.select();
      //onInput();
      //  el.value.addEventListener("input", onInput);
    }
  });
*/
  // onUnmounted(() => {
  //   if (el.value) {
  //     el.value.removeEventListener("keydown", onKeydown);
  //     el.value.removeEventListener("input", onInput);
  //   }
  // });

  return el;
};

export const useScrollToBottom = () => {
  const el = ref(null);
  onMounted(() => {
    if (el.value) {
      el.value.scrollTop = el.value.scrollHeight;
      const observer = new MutationObserver(
        () => (el.value.scrollTop = el.value.scrollHeight)
      );
      observer.observe(el.value, { childList: true });
    }
  });
  return el;
};
