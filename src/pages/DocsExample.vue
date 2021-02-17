<script setup>
import { ref } from "vue";
const title = ref("");
const content = ref("");
const url =
  "https://docs.google.com/document/d/e/2PACX-1vQTwG3_l3c5SLgb12Gp6JnJOYDZmq3Rj4BlEtLQ_7-w3LjOmXVB_Su5Lh2S8RlqBdXPmsN8ocU-vey4/pub";
fetch(
  `https://api.allorigins.win/get?url=${encodeURIComponent(
    url
  )}&${Math.random()}`
)
  .then((res) => res.json())
  .then((res) => {
    const dom = new DOMParser().parseFromString(res.contents, "text/html");
    title.value = dom.getElementById("title").innerText;
    content.value = dom.getElementById("contents").children[1].innerHTML;
    //console.log(a);
  });
</script>

<template>
  <h1>{{ title }}</h1>
  <div v-html="content" style="padding: 32px"></div>
</template>

<style>
.title {
  margin: 0;
  font-family: "font-medium", sans-serif;
  font-size: 2.5em;
}
.subtitle {
  font-size: 1.75em;
}
.c6 {
  font-style: italic;
}
.c5 {
  font-weight: bold;
}
</style>
