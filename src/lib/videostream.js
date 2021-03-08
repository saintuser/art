import {
  onMounted,
  ref,
} from 'vue';

import Hls from 'hls.js';

export const useVideoStream = (src) => {
  const retryDelay = 3000;

  const videoRef = ref(null);

  const status = ref("nodata");
  const width = ref(640);
  const height = ref(360);

  onMounted(() => {
    videoRef.value.addEventListener("loadedmetadata", (e, e2) => {});

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
      status.value = "nodata";
    });

    videoRef.value.addEventListener("stalled", (e) => {});

    videoRef.value.addEventListener("suspensed", (e) => {});

    videoRef.value.addEventListener("ended", (e) => {
      status.value = "nodata";
    });

    if (videoRef.value.canPlayType("application/vnd.apple.mpegURL")) {
      videoRef.value.src = src;

      let timeout = null;
      timeout = setInterval(() => {
        videoRef.value.src = src;
      }, retryDelay);

      videoRef.value.addEventListener("loadeddata", (e) => {
        if (timeout) {
          clearTimeout(timeout);
        }
      });

      videoRef.value.addEventListener("waiting", (e) => {
        status.value = "loading";
        timeout = setInterval(() => {
          videoRef.value.src = src;
        }, retryDelay);
      });
    } else {
      if (Hls.isSupported()) {
        const hls = new Hls({
          manifestLoadingRetryDelay: retryDelay,
          manifestLoadingMaxRetry: Infinity,
          xhrSetup: function (xhr) {
            xhr.addEventListener("error", (e) => {
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
          hls.recoverMediaError();
          if (data.type !== Hls.ErrorTypes.MEDIA_ERROR) {
            hls.startLoad();
          }
        });
      }
    }
  });

  return { videoRef, status, width, height };
};
