import { ref, computed, isRef } from "vue";
import { IMAGE_POLL_INTERVAL, IMAGE_ASPECT_RATIO } from "../constants";

export const useImage = (element) => {
  const image = new Image();
  const naturalWidth = ref(0);
  const naturalHeight = ref(0);

  const aspectRatio = computed(() => {
    return naturalWidth.value
      ? naturalHeight.value / naturalWidth.value
      : IMAGE_ASPECT_RATIO;
  });

  const pollImageData = setInterval(() => {
    if (image && image.naturalWidth) {
      clearInterval(pollImageData);

      naturalWidth.value = image.naturalWidth;
      naturalHeight.value = image.naturalHeight;
    }
  }, IMAGE_POLL_INTERVAL);

  const imageRenderer = (imageNode) => {
    const canvas = document.createElement("canvas");

    canvas.setAttribute("hidden", true);
    canvas.setAttribute("data-src", imageNode.src);
    canvas.width = 1;
    canvas.height = 1;

    document.body.appendChild(canvas);

    canvas.getContext("2d").drawImage(imageNode, 0, 0);

    document.body.removeChild(canvas);
  };

  const loadImage = () => {
    const imageNode = isRef(element) ? element.value : element;
    const src = imageNode.src;

    image.src = src;

    if (image.complete) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      image.onload = () => {
        imageRenderer(imageNode);
        resolve();
      };

      image.onerror = reject;
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
