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
    containerRef,
    imageRef,
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

  const loadImage = () => {
    image.src = src;

    return new Promise((resolve, reject) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");

        if (canvas && canvas.getContext) {
          canvas.setAttribute("hidden", true);
          canvas.width = naturalWidth.value;
          canvas.height = naturalHeight.value;

          containerRef.value.appendChild(canvas);

          canvas.getContext("2d").drawImage(imageRef.value, 0, 0);
        }

        resolve();
      };

      image.onerror = (error) => reject(error);
    });
  };

  return {
    image,
    aspectRatio,
    naturalWidth,
    naturalHeight,
    loadImage,
  };
};

export default useImage;
