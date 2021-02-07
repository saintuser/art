import { ref, onMounted } from "vue";
import Hls from "hls.js";

export function debounce(fn, timeout) {
  let t;
  return function () {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, arguments), timeout);
  };
}

export const useHls = (src) => {
  const retryDelay = 4000;
  const el = ref(null);
  onMounted(() => {
    el.value.addEventListener("ended", (e) => {
      console.log("ended");
    });
    el.value.addEventListener("loadedmetadata", (e) => {
      console.log("loadedmetadata");
    });
    el.value.addEventListener("ended", (e) => {
      console.log("ended");
    });
    el.value.addEventListener("emptied", (e) => {
      console.log("emptied");
    });
    el.value.addEventListener("loadeddata", (e) => {
      console.log("loadeddata");
    });
    el.value.addEventListener("stalled", (e) => {
      console.log("stalled");
    });
    el.value.addEventListener("suspend", (e) => {
      console.log("suspend");
    });
    el.value.addEventListener("waiting", (e) => {
      console.log("waiting");
    });
    if (el.value.canPlayType("application/vnd.apple.mpegsrc")) {
      el.value.src = src;
      //el.value.onerror = debounce(() => (el.value.src = src), 1000);
      el.value.addEventListener("error", (e) => {
        console.log("error");
        debounce(() => {
          //el.value.src = src;
          console.log("debounce");
        }, 100);
      });
      console.log("hls");
    } else if (Hls.isSupported()) {
      const hls = new Hls({
        manifestLoadingRetryDelay: 1000,
        manifestLoadingMaxRetry: Infinity,
        progressive: true,
        xhrSetup: function (xhr, url) {
          xhr.addEventListener("error", (e) => {
            console.log("xhr error");
            el.value.src = src;
          });
        },
      });
      hls.attachMedia(el.value);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(src);
      });
      hls.on(Hls.Events.ERROR, function (e, data) {
        //hls.recoverMediaError();
        //hls.startLoad();
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.log("hls network");
              console.log("fatal network error encountered, try to recover");
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log("hls mediua");
              break;
            default:
              console.log("hls destroy");
              break;
          }
        }
      });
    }
  });
  return el;
};
