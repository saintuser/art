import { ref, onMounted, h } from "vue";
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
      console.log(el.value.videoWidth, el.value.videoHeight);
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
    } else if (Hls.isSupported()) {
      const hls = new Hls({
        manifestLoadingRetryDelay: 1000,
        manifestLoadingMaxRetry: Infinity,
        //progressive: true,
        xhrSetup: function (xhr, url) {
          xhr.addEventListener("error", (e) => {
            console.log("xhr error");
            el.value.play();
            // hls.destroy();
            // hls = new Hls(init);
            // hls.attachMedia(el.value);
            // hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            //   hls.loadSource(src);
            // });
            // el.value.play();
          });
        },
      });

      hls.attachMedia(el.value);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(src);
        hls.startLoad();
        //el.value.play();
      });
      hls.on(Hls.Events.ERROR, function (e, data) {
        console.log("hlserror");
        console.log(data);
        hls.recoverMediaError();
        if (data.type !== Hls.ErrorTypes.MEDIA_ERROR) {
          hls.startLoad();
        } else {
          hls.recoverMediaError();
        }
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

      // const hls = new Hls({
      //   manifestLoadingRetryDelay: 1000,
      //   manifestLoadingMaxRetry: Infinity,
      //   progressive: true,
      //   xhrSetup: function (xhr, url) {
      //     xhr.addEventListener("error", (e) => {
      //       console.log("xhr error");
      //       //el.value.src = src;
      //       hls.loadSource(src);
      //     });
      //   },
      // });
      // hls.attachMedia(el.value);
      // hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      //   hls.loadSource(src);
      // });
      // hls.on(Hls.Events.ERROR, function (e, data) {
      //   //hls.recoverMediaError();
      //   //hls.startLoad();
      //   if (data.fatal) {
      //     switch (data.type) {
      //       case Hls.ErrorTypes.NETWORK_ERROR:
      //         console.log("hls network");
      //         console.log("fatal network error encountered, try to recover");
      //         break;
      //       case Hls.ErrorTypes.MEDIA_ERROR:
      //         console.log("hls mediua");
      //         break;
      //       default:
      //         console.log("hls destroy");
      //         break;
      //     }
      //   }
      // });
    }
  });
  return el;
};
