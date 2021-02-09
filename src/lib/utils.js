export function debounce(fn, timeout) {
  let t;
  return function () {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, arguments), timeout);
  };
}

export const inject = (str, obj) => str.replace(/\${(.*?)}/g, (_, v) => obj[v]);
