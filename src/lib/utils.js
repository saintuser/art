export function debounce(fn, timeout) {
  let t;
  return function () {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, arguments), timeout);
  };
}

export const inject = (str, obj) => str.replace(/\${(.*?)}/g, (_, v) => obj[v]);

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const useJson = (url) => {
  const json = ref(null);
  return fetch(url)
    .then((res) => res.json())
    .then((res) => (json.value = res));
};
