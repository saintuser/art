<script setup>
import { ref, computed, defineProps } from "vue";
import { emitter, useScrollToBottom } from "../lib";

const props = defineProps({ channel: String });
const imgSrc = ref(null);

const onSnapshot = () => emitter.emit("SNAPSHOT_REQUEST");
const images = ref([]);
emitter.on("SNAPSHOT_RESPONSE", (image) => {
  images.value = [...images.value, image];
});
const imagesRef = useScrollToBottom();
</script>

<template>
  <Vertical>
    <Button @click="onSnapshot">Take Snapshot</Button>
    <Vertical
      v-if="images.length"
      style="overflow: auto; height: 70vh; gap: 0"
      ref="imagesRef"
    >
      <img
        v-for="(image, i) in images"
        :key="i"
        :src="image"
        style="width: 100%"
      />
    </Vertical>
  </Vertical>
</template>
