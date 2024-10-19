import { ref, computed, isRef, nextTick } from "vue";
import { IMAGE_POLL_INTERVAL, IMAGE_ASPECT_RATIO } from "../constants";

export const useImage = (element) => {
  const image = new Image();
  const width = ref(0);
  const height = ref(0);

  const aspectRatio = computed(() => {
    return width.value ? height.value / width.value : IMAGE_ASPECT_RATIO;
  });

  const pollImageData = setInterval(() => {
    if (image && image.width) {
      clearInterval(pollImageData);

      width.value = image.width;
      height.value = image.height;
    }
  }, IMAGE_POLL_INTERVAL);

  const imageRenderer = (imageNode) => {
    const canvas = document.createElement("canvas");

    canvas.width = 1;
    canvas.height = 1;

    canvas.setAttribute("hidden", true);

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
        nextTick(resolve);
      };

      image.onerror = reject;
    });
  };

  return {
    width,
    height,
    aspectRatio,
    loadImage,
  };
};

export default useImage;
