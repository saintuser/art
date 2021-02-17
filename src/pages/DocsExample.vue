<script setup>
import { useDoc } from "../lib";

const url =
  "https://docs.google.com/document/d/e/2PACX-1vQTwG3_l3c5SLgb12Gp6JnJOYDZmq3Rj4BlEtLQ_7-w3LjOmXVB_Su5Lh2S8RlqBdXPmsN8ocU-vey4/pub";

const { content } = useDoc(url);
</script>

<template>
  <div v-html="content" class="wrapper" style=""></div>
</template>

<style>
.title {
  margin: 0;
  font-family: "font-medium", sans-serif;
  font-size: 4em;
  line-height: 1em;
}

.subtitle {
  font-size: 1.75em;
}
.c3 .c2 {
  font-style: italic;
}
.c5 {
  font-weight: bold;
}

.wrapper {
  padding: clamp(1rem, 5vw, 3rem);
  display: grid;
  gap: 24px;
  grid-template-columns:
    1fr
    min(65ch, 100%)
    1fr;
}
.wrapper > * {
  grid-column: 2;
}
.wrapper p {
  margin: 0;
}
.full-bleed {
  width: 100%;
  grid-column: 1 / 4;
}
</style>
