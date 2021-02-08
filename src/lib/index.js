import { ref, onMounted, h } from "vue";
import Hls from "hls.js";

export function debounce(fn, timeout) {
  let t;
  return function () {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, arguments), timeout);
  };
}

const hlsReloadFrequency = 1000;

export const useHls = (src) => {
  const retryDelay = 4000;
  const el = ref(null);

  onMounted(() => {
    el.value.addEventListener("play", (e) => {
      console.log("play");
    });
    el.value.addEventListener("playing", (e) => {
      console.log("playing");
    });
    el.value.addEventListener("ended", (e) => {
      console.log("ended");
    });
    el.value.addEventListener("loadedmetadata", (e, e2) => {
      console.log("loadedmetadata");
      if (el.value) {
        console.log(el.value.videoWidth, el.value.videoHeight);
      }
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

    if (el.value.canPlayType("application/vnd.apple.mpegURL")) {
      console.log("SAFARI");
      el.value.src = src;
      el.value.addEventListener("waiting", (e) => {
        console.log("apple error");
        el.value.src = src;
        debounce(() => {
          el.value.src = src;
          console.log("debounce");
        }, hlsReloadFrequency);
      });
    } /*else if (Hls.isSupported()) {
      console.log("CHROME");
      const hls = new Hls({
        manifestLoadingRetryDelay: hlsReloadFrequency,
        manifestLoadingMaxRetry: Infinity,
        xhrSetup: function (xhr, url) {
          xhr.addEventListener("error", (e) => {
            console.log("xhr error");
            el.value.play();
          });
        },
      });

      hls.attachMedia(el.value);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(src);
        hls.startLoad();
      });
      hls.on(Hls.Events.ERROR, function (e, data) {
        console.log("hlserror");
        console.log(data);
        if (data.type !== Hls.ErrorTypes.MEDIA_ERROR) {
          hls.startLoad();
        } else {
          hls.recoverMediaError();
        }
      });
    }*/
  });
  return el;
};
