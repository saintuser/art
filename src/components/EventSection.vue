<script setup>
import { defineProps, ref } from "vue";
import { replaceYoutube } from "../lib";
defineProps({
  event: { type: Object },
  description: { type: Boolean, default: true },
});
const isOpen = ref(false);
</script>
<template>
  <Vertical style="gap: 4px">
    <div>
      <Vertical style="gap: 4px">
        <h2 style="cursor: pointer" @click="isOpen = !isOpen">
          {{ event.title }}
        </h2>
        <Flex v-if="event.fientaid" style="color: var(--ticket)">
          <IconCreditcard />
          It is a paid event
        </Flex>
        <EventDate :event="event" />
      </Vertical>
      <Youtube :src="event.youtube" style="margin-bottom: 8px" />
      <Vertical>
        <Small v-if="event && event.intro && !isOpen" style="opacity: 0.8">
          <Vertical class="EventIntro">{{ event.intro }} </Vertical>
        </Small>
        <Small v-if="description && isOpen">
          <Vertical class="EventIntro" v-html="event.description" />
        </Small>
      </Vertical>
    </div>

    <Flex style="gap: 16px; margin-top: 8px">
      <Button v-if="!isOpen" @click="isOpen = true">More info</Button>
      <Button v-if="isOpen" @click="isOpen = false">Less info</Button>
      <RouterLink class="EventCard" :to="'/' + event.eventid">
        <Button
          :style="{
            opacity:
              event.urgency === 'soon' || event.urgency === 'node' ? 1 : 0.25,
          }"
          >Go to event</Button
        >
      </RouterLink>
    </Flex>
  </Vertical>
</template>

<style scoped>
.EventCard {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
}
.EventCard > .Icon {
  transform: scale(1.4) translateY(0.4ch);
}
.EventContent {
  display: grid;
  gap: 4px;
}
.EventIntro {
  opacity: 0.85;
  word-wrap: break-word;
}
</style>
