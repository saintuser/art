<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLocalstorage, fienta, uniqueCollection, events } from "../lib";

const router = useRouter();
const { query } = useRoute();

const code = ref(query.code);
const status = ref("");

const codes = useLocalstorage("elektron_data", []);

const localTicket = computed(() => {
  const ticket = codes.value?.find((ticket) => ticket.code === code.value);
  return ticket;
});

const onCheck = async () => {
  if (code.value) {
    fienta
      .get(`tickets/${code.value}`)
      .json()
      .then((res) => {
        status.value = res?.ticket?.status;
        codes.value = uniqueCollection(
          [...codes.value, { code: code.value, fientaid: res.ticket.event_id }],
          "code"
        );
      })
      .catch((e) => (status.value = "DOES NOT EXIST"));
  }
  router.push({ path: "/fienta" });
};

const onUnuse = async () => {
  fienta
    .put(`tickets/${code.value}`, { json: { status: "UNUSED" } })
    .json()
    .then(onCheck)
    .catch((e) => console.log(e));
};

const onUse = async () => {
  await fienta
    .put(`tickets/${code.value}`, { json: { status: "USED" } })
    .json()
    .then(onCheck)
    .catch((e) => console.log(e));
};

// const updatedTicket = await fienta
//   .put(`tickets/${code}`, { json: { status: "USED" } })
//   .json();

const ticketStatusString = computed(() => {
  let statuses = [];
  // if (code.value && localTicket.value) {
  //   statuses.push(`HAS LOCAL TICKET ${JSON.stringify(localTicket.value)}`);
  // }
  // if (code.value && !localTicket.value) {
  //   statuses.push(`NO LOCAL TICKET`);
  // }
  if (code.value && status.value) {
    statuses.push(`Fienta server status: ${status.value} TICKET`);
  } else {
    statuses.push(" ");
  }
  return statuses.join("\n");
});

const eventid = ref("");
const eventString = ref("");
const checkEvent = () => {
  if (eventid.value) {
    let lines = [];
    const e = events.value.find((event) => event.eventid === eventid.value);
    // We use double equal since fientaid can be either int or number
    const ticket = codes.value?.find((code) => code.fientaid == e.fientaid);
    if (ticket) {
      lines.push(`LOCAL TICKET`);
      lines.push(JSON.stringify(ticket));
    } else {
      lines.push(`NO LOCAL TICKET`);
    }
    eventString.value = lines.join("\n");
  }
};
</script>

<template>
  <div>
    <Overlay>
      <!-- <h1>Check your event ticket</h1>
      <input v-model="eventid" placeholder="Enter event id" />
      <Button @click="checkEvent">Check my event ticket</Button>
      <pre>{{ eventString }}</pre> -->
      <h1>Check your ticket</h1>
      <input v-model="code" placeholder="Enter ticket code" />
      <Button @click="onCheck">Check my ticket</Button>
      <pre>{{ ticketStatusString }}</pre>
      <Button v-if="status && status === 'USED'" @click="onUnuse">
        Unuse ticket
      </Button>
      <Button v-if="status && status === 'UNUSED'" @click="onUse">
        Use ticket
      </Button>
    </Overlay>
    <ButtonBack />
  </div>
</template>
