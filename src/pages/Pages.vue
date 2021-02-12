<script setup>
import { ref } from "vue";
import { config } from "../lib";

const posts = ref([]);
fetch(config.postsUrl)
  .then((res) => res.json())
  .then((res) => (posts.value = res));

const pages = ref([]);
fetch(config.pagesUrl)
  .then((res) => res.json())
  .then((res) => (pages.value = res));
</script>
<template>
  <div style="padding: 48px 48px 48px 48px">
    <h1 style="color: red">{{ posts.length }} posts</h1>
    <div v-for="(post, i) in posts" :key="i">
      <h1>{{ post.title.rendered ? post.title.rendered : "(no title)" }}</h1>
      <a :href="post.link" target="_blank">{{ post.link }}</a>
      <p v-html="post.content.rendered"></p>
    </div>
    <br />
    <br />
    <h1 style="color: red">{{ pages.length }} posts</h1>
    <div v-for="(page, i) in pages" :key="i">
      <br />
      <br />
      <hr />
      <br />
      <br />
      <h1>{{ page.title.rendered ? page.title.rendered : "(no title)" }}</h1>
      <a :href="page.link" target="_blank">{{ page.link }}</a>
      <p v-html="page.content.rendered"></p>
    </div>
  </div>
</template>

<style>
img,
video {
  width: 320px;
  height: 240px;
  float: right;
  padding: 24px;
}
h1 {
  font-size: 48px;
}
p {
  font-size: 0.8em;
}
</style>
