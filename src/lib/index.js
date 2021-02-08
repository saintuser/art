import { ref, onMounted, h, watch } from "vue";
import Hls from "hls.js";

export function debounce(fn, timeout) {
  let t;
  return function () {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, arguments), timeout);
  };
}

export const useHls = (src) => {
  const retryDelay = 3000;

  const videoRef = ref(null);
  const canvasRef = ref(null);

  const status = ref("nodata");
  const width = ref(640);
  const height = ref(360);

  // watch(
  //   () => width.value,
  //   (width) => {
  //     console.log("width");
  //     canvasRef.value.width = width;
  //   },
  //   { immediate: true }
  // );

  // watch(
  //   () => height,
  //   (height) => (canvasRef.value.height = height),
  //   { immediate: true }
  // );

  onMounted(() => {
    setInterval(() => {
      if (canvasRef.value) {
        canvasRef.value.width = width.value;
        canvasRef.value.height = height.value;
        const context = canvasRef.value.getContext("2d");
        context.drawImage(videoRef.value, 0, 0, width.value, height.value);
      }
    }, 2000);

    videoRef.value.addEventListener("loadeddata", (e) => {
      status.value = "loading";
      width.value =
        videoRef.value?.videoWidth > 0 ? videoRef.value?.videoWidth : -1;
      height.value =
        videoRef.value?.videoHeight > 0 ? videoRef.value?.videoHeight : -1;
      //     ? videoRef.value.videoWidth
      //     : -1;
      // if (
      //   videoRef.value &&
      //   videoRef.value.videoWidth &&
      //   videoRef.value.videoHeight
      // ) {
      //   width.value = videoRef.value.videoWidth
      //     ? videoRef.value.videoWidth
      //     : -1;
      //   height.value = videoRef.value.videoHeight
      //     ? videoRef.value.videoHeight
      //     : -1;
      // }
    });

    videoRef.value.addEventListener("playing", (e) => {
      status.value = "playing";
      width.value =
        videoRef.value?.videoWidth > 0 ? videoRef.value?.videoWidth : -1;
      height.value =
        videoRef.value?.videoHeight > 0 ? videoRef.value?.videoHeight : -1;
    });

    videoRef.value.addEventListener("emptied", (e) => {
      console.log("emptied");
      status.value = "nodata";
    });

    videoRef.value.addEventListener("stalled", (e) => {
      console.log("stalled");
      //status.value = "loading";
    });

    videoRef.value.addEventListener("suspensed", (e) => {
      console.log("suspensed");
    });

    videoRef.value.addEventListener("ended", (e) => {
      console.log("ended");
      status.value = "nodata";
    });

    if (videoRef.value.canPlayType("application/vnd.apple.mpegURL")) {
      console.log("SAFARI");

      videoRef.value.src = src;

      let timeout = null;
      timeout = setInterval(() => {
        console.log("interval");
        videoRef.value.src = src;
      }, retryDelay);

      videoRef.value.addEventListener("loadeddata", (e) => {
        console.log("clearing timeout");
        if (timeout) {
          clearTimeout(timeout);
        }
      });

      videoRef.value.addEventListener("waiting", (e) => {
        status.value = "loading";
        timeout = setInterval(() => {
          console.log("waiting interval");
          videoRef.value.src = src;
        }, retryDelay);
      });
    } else {
      if (Hls.isSupported()) {
        console.log("CHROME");
        const hls = new Hls({
          manifestLoadingRetryDelay: retryDelay,
          manifestLoadingMaxRetry: Infinity,
          xhrSetup: function (xhr) {
            xhr.addEventListener("error", (e) => {
              console.log("xhr error");
              hls.loadSource(src);
              hls.startLoad();
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
          hls.recoverMediaError();
          if (data.type !== Hls.ErrorTypes.MEDIA_ERROR) {
            hls.startLoad();
          }
        });
      }
    }
  });

  return { videoRef, canvasRef, status, width, height };
};
