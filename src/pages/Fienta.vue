<script setup>
import { fienta, config } from "../lib";

const ticket = await fienta.get(`tickets/${config.fientaTestcode}`).json();
console.log(ticket);
// const updatedTicket = await fienta
//   .put(`tickets/${code}`, { json: { status: "USED" } })
//   .json();
</script>

<template><div>Hey</div></template>
