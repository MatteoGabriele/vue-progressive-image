import { ref, computed } from "vue";
import {
  DEFAULT_IMAGE_POLL_INTERVAL,
  DEFAULT_IMAGE_ASPECT_RATIO,
} from "../constants";

export const useImage = (
  src,
  {
    imagePollInterval = DEFAULT_IMAGE_POLL_INTERVAL,
    imageAspectRatio = DEFAULT_IMAGE_ASPECT_RATIO,
  } = {}
) => {
  if (!src) {
    return;
  }

  const image = new Image();
  const naturalWidth = ref(0);
  const naturalHeight = ref(0);

  const aspectRatio = computed(() => {
    const width = naturalWidth.value;
    const height = naturalHeight.value;

    return width ? height / width : imageAspectRatio * 1;
  });

  const pollImageData = setInterval(() => {
    if (image && image.naturalWidth) {
      clearInterval(pollImageData);

      naturalWidth.value = image.naturalWidth;
      naturalHeight.value = image.naturalHeight;
    }
  }, imagePollInterval * 1);

  image.src = src;

  return {
    image,
    aspectRatio,
    naturalWidth,
    naturalHeight,
    onLoad: (fn) => (image.onload = fn),
    onError: (fn) => (image.onerror = fn),
  };
};

export default useImage;
