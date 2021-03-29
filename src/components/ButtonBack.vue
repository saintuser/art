<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const onBack = () => router.go(-1);
const props = defineProps({ to: { type: String, default: "/" } });
</script>

<template>
  <div style="position: fixed; left: 10px; top: 10px">
    <IconLeft @click="onBack" />
  </div>
</template>
