<template>
  Hello {{ events }}
  <router-link to="/videostream-example">VideoStream</router-link>
</template>

<script setup>
import { useEvents } from "../lib/index.js";
const events = useEvents();

import { ICalendar } from "datebook";

const e = ["a", "b"];
const formatEvent = (e) => ({ title: e, start: new Date(), end: new Date() });

const calendar = new ICalendar(formatEvent(e[0]));
e.slice(1).forEach((e) => calendar.addEvent(new ICalendar(formatEvent(e))));

const cal = calendar.render();
console.log(cal);
</script>
