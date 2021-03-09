//@ts-check
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
} from 'vue';

export function debounce(fn, timeout) {
  let t;
  return function () {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, arguments), timeout);
  };
}

export const replace = (str, obj) =>
  str.replace(/\${(.*?)}/g, (_, v) => obj[v]);

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const useLocalstorage = (key = null, initialValue = null) => {
  const value = ref(initialValue);
  if (window.localStorage !== undefined) {
    if (initialValue !== null && key && !window.localStorage.getItem(key)) {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
    }
    const localValue = computed({
      get: () => {
        let storedValue = null;
        if (key && window.localStorage.getItem(key)) {
          storedValue = JSON.parse(window.localStorage.getItem(key));
          return storedValue !== value.value ? storedValue : value.value;
        }
        return value.value;
      },
      set: (val) => {
        value.value = val;
        if (key) {
          window.localStorage.setItem(key, JSON.stringify(val));
        }
      },
    });
    return localValue;
  }
  return value;
};

export const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

export const any = (arr) => shuffle(arr)[0];

export const safeJsonParse = (str) => {
  try {
    return JSON.parse(str);
  } catch (err) {
    return null;
  }
};

export const uniqueCollection = (arr, key) => {
  const result = [];
  const map = new Map();
  for (const item of arr.reverse()) {
    if (!map.has(item[key])) {
      map.set(item[key], true);
      result.push(item);
    }
  }
  return result.reverse();
};

export const useTextarea = (callback) => {
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
      onInput();
      el.value.addEventListener("input", onInput);
    }
  });

  onUnmounted(() => {
    if (el.value) {
      el.value.removeEventListener("keydown", onKeydown);
    }
  });

  return el;
};

export const useScrollToBottom = () => {
  const el = ref(null);
  onMounted(() => {
    el.value.scrollTop = el.value.scrollHeight;
    const observer = new MutationObserver(
      () => (el.value.scrollTop = el.value.scrollHeight)
    );
    observer.observe(el.value, { childList: true });
  });
  return el;
};

export const randomId = (length = 16) => {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  return shuffle(letters).slice(0, length).join("");
};

export const wsToUrl = (ws) =>
  ws.replace("ws://", "http://").replace("wss://", "https://");

export const scale = (value, start1, stop1, start2, stop2) => {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};
