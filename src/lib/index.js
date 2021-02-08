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
  const videoRef = ref(null);
  const isLoading = ref(true);

  onMounted(() => {
    videoRef.value.addEventListener("play", (e) => {
      console.log("play");
    });
    videoRef.value.addEventListener("playing", (e) => {
      console.log("playing");
      isLoading.value = false;
    });
    videoRef.value.addEventListener("ended", (e) => {
      console.log("ended");
    });
    videoRef.value.addEventListener("loadedmetadata", (e, e2) => {
      console.log("loadedmetadata");
      if (videoRef.value) {
        console.log(videoRef.value.videoWidth, videoRef.value.videoHeight);
      }
    });
    videoRef.value.addEventListener("ended", (e) => {
      console.log("ended");
    });
    videoRef.value.addEventListener("emptied", (e) => {
      console.log("emptied");
    });
    videoRef.value.addEventListener("loadeddata", (e) => {
      console.log("loadeddata");
    });
    videoRef.value.addEventListener("stalled", (e) => {
      console.log("stalled");
    });
    videoRef.value.addEventListener("suspend", (e) => {
      console.log("suspend");
    });
    videoRef.value.addEventListener("waiting", (e) => {
      console.log("waiting");
    });

    if (videoRef.value.canPlayType("application/vnd.apple.mpegURL")) {
      console.log("SAFARI");
      // setInterval(() => {
      //   console.log("interval");
      //   videoRef.value.src = src;
      // }, 1000);
      videoRef.value.addEventListener("waiting", (e) => {
        isLoading.value = true;
        videoRef.value.src = src;
        // debounce(() => {
        //   videoRef.value.src = src;
        //   console.log("debounce");
        // }, hlsReloadFrequency);
      });
    } /*else if (Hls.isSupported()) {
      console.log("CHROME");
      const hls = new Hls({
        manifestLoadingRetryDelay: hlsReloadFrequency,
        manifestLoadingMaxRetry: Infinity,
        xhrSetup: function (xhr, url) {
          xhr.addEventListener("error", (e) => {
            console.log("xhr error");
            videoRef.value.play();
          });
        },
      });

      hls.attachMedia(videoRef.value);
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
  return { videoRef, isLoading };
};
