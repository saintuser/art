//@ts-check
import {
  ref,
  watch,
} from 'vue';

import { useCssVar } from '@vueuse/core';

const themeVars = {
  bgdark: useCssVar("--bgdark"),
  bg: useCssVar("--bg"),
  bglight: useCssVar("--bglight"),
  bglighter: useCssVar("--bglighter"),
  fg: useCssVar("--fg"),
  fgdark: useCssVar("--fgdark"),
  ticket: useCssVar("--ticket"),
};

const themeValues = [
  {
    bgdark: "#000",
    bg: "#111",
    bglight: "#222",
    bglighter: "#333",
    fg: "#fff",
    fgdark: "#555",
    ticket: "#ffc107",
  },
  {
    bgdark: "#ddd",
    bg: "#fff",
    bglight: "#eee",
    bglighter: "#ddd",
    fg: "#000",
    fgdark: "#ccc",
    ticket: "#f0b400",
  },
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
