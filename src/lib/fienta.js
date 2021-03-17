import {
  computed,
  ref,
  watch,
} from 'vue';

import ky from 'ky';

import {
  config,
  uniqueCollection,
  useLocalstorage,
} from './';

export const fienta = ky.extend({
  prefixUrl: config.fientaUrl,
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("Authorization", `Bearer ${config.fientaToken}`);
      },
    ],
  },
});

// const useFienta = (event, code = null) => {
//   const code = isRef(code) ? code : ref(code);

//   const tickets = useLocalstorage("elektron_data", []);

//   const hasLocalTicket = computed(() =>
//     tickets.value?.find((ticket) => ticket.code === code.value)
//   );

//   const tickedChecked = ref(false)

//   watch(event, () => {

//   })
// };

const tickets = useLocalstorage("elektron_data", []);

const checkLocalTicketWithoutCode = (event) => {
  return tickets.value?.find(
    (ticket) => ticket.fientaid == event.value.fientaid
  );
};

const checkLocalTicket = (code, event) => {
  return tickets.value?.find(
    (ticket) =>
      ticket.code == code.value && ticket.fientaid == event.value.fientaid
  );
};

const storeLocalTicket = (code, event) => {
  tickets.value = uniqueCollection(
    [
      ...tickets.value,
      {
        code: code.value,
        fientaid: event.value.fientaid,
      },
    ],
    "code"
  );
};

const checkRemoteTicket = (code, event) =>
  fienta
    .get(`tickets/${code.value}`)
    .json()
    .then((res) => {
      if (res?.ticket?.event_id == event.value.fientaid) {
        return res?.ticket?.status;
      } else {
        return "REMOTE_CHECK_ERROR";
      }
    });

const useTicket = async (code) => {
  await fienta
    .put(`tickets/${code.value}`, { json: { status: "USED" } })
    .json();
};

export const unUseTicket = async (code) => {
  await fienta
    .put(`tickets/${code.value}`, { json: { status: "UNUSED" } })
    .json();
};

const statuses = {
  UNCHECKED: "",
  CHECKED: "",
  USED: "This ticket has been used already.",
  ERROR: "Ticket checking failed, please try again.",
};

export const checkTicket = (code, event) => {
  const status = ref("UNCHECKED");
  watch(
    [code, event],
    () => {
      if (!code.value && event.value) {
        if (checkLocalTicketWithoutCode(event)) {
          status.value = "CHECKED";
        }
      } else if (code.value && event.value) {
        if (checkLocalTicket(code, event)) {
          status.value = "CHECKED";
        } else {
          checkRemoteTicket(code, event)
            .then((checkStatus) => {
              if (checkStatus === "UNUSED") {
                useTicket(code)
                  .then((_) => {
                    storeLocalTicket(code, event);
                    status.value = "CHECKED";
                  })
                  .catch((e) => (status.value = "ERROR"));
              }
              if (checkStatus === "USED") {
                status.value = "USED";
              }
              // @TODO Handle REFUND_REQUESTED ?
            })
            .catch((e) => (status.value = "ERROR"));
        }
      }
    },
    { immediate: true }
  );
  const statusMessage = computed(() => statuses[status.value]);
  return { status, statusMessage };
};
