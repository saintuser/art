<script setup>
import { ref } from "vue";
import { fienta, config } from "../lib";

const code = ref("");
const status = ref("");

const onSubmitCode = async () => {
  if (code.value) {
    fienta
      .get(`tickets/${code.value}`)
      .json()
      .then((res) => {
        console.log(res);
        status.value = res?.ticket?.status;
      })
      .catch((e) => (status.value = "DOES NOT EXIST"));
  }
};
// const updatedTicket = await fienta
//   .put(`tickets/${code}`, { json: { status: "USED" } })
//   .json();
</script>

<template>
  <div>
    <Overlay>
      <h1>Check your ticket</h1>
      <input v-model="code" placeholder="Enter ticket code" />
      <Button @click="onSubmitCode">Check my ticket</Button>
      <pre v-if="status">status: TICKET {{ status }}</pre>
      <pre v-else>status:</pre>
    </Overlay>
    <ButtonBack />
  </div>
</template>
