<script setup>
import { ref } from "vue";
const doc = ref("");
const url =
  "https://docs.google.com/document/d/e/2PACX-1vQTwG3_l3c5SLgb12Gp6JnJOYDZmq3Rj4BlEtLQ_7-w3LjOmXVB_Su5Lh2S8RlqBdXPmsN8ocU-vey4/pub";
fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
  .then((res) => res.json())
  .then((res) => {
    const dom = new DOMParser().parseFromString(res.contents, "text/html");
    doc.value = dom.getElementById("contents").children[1].innerHTML;
    //console.log(a);
  });
</script>

<template>
  <div v-html="doc" style="padding: 32px"></div>
</template>

<style>
.title {
  font-size: 2em;
}
.c4 {
  font-style: italic;
}
.c5 {
  font-weight: bold;
}
</style>
