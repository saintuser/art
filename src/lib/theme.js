//@ts-check
import { computed, ref } from "vue";

export const activeTheme = ref(0);

const themeVars = [
  { bg: "black", fg: "white" },
  { bg: "white", fg: "black" },
];

export const theme = computed(() => themeVars[activeTheme.value]);

export const toggleTheme = () => (activeTheme.value = 1 - activeTheme.value);
