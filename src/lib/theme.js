//@ts-check
import {
  ref,
  watch,
} from 'vue';

import { useCssVar } from '@vueuse/core';

const themeVars = {
  bg: useCssVar("--bg"),
  bgdark: useCssVar("--bgdark"),
  fg: useCssVar("--fg"),
};

const themeValues = [
  { bg: "#111", bgdark: "#000", fg: "#fff" },
  { bg: "#fff", bgdark: "#dadada", fg: "#000" },
];

export const activeTheme = ref(0);

watch(
  activeTheme,
  () =>
    Object.entries(themeValues[activeTheme.value]).forEach(([key, value]) => {
      themeVars[key].value = value;
    }),
  { immediate: true }
);

export const toggleTheme = () => (activeTheme.value = 1 - activeTheme.value);
