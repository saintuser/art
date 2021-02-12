<script setup>
import { ref } from "vue";
import { config } from "../lib";

const posts = ref([]);
fetch(config.postsUrl)
  .then((res) => res.json())
  .then((res) => (posts.value = res));
</script>
<template>
  <div style="padding: 24px">
    <h1>Posts</h1>
    <div v-for="(post, i) in posts" :key="i">
      <h2>{{ post.title.rendered ? post.title.rendered : "(no title)" }}</h2>
      <a :href="post.link" target="_blank">{{ post.link }}</a>
      <p v-html="post.content.rendered"></p>
    </div>
  </div>
</template>
