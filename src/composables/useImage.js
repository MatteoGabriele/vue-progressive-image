import { ref, computed, isRef, onMounted } from "vue";
import { IMAGE_POLL_INTERVAL, IMAGE_ASPECT_RATIO } from "../constants";

export const useImage = (
  element,
  {
    imagePollInterval = IMAGE_POLL_INTERVAL,
    imageAspectRatio = IMAGE_ASPECT_RATIO,
  } = {}
) => {
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
    const imageNode = isRef(element) ? element.value : element;
    const src = imageNode.src;

    image.src = src;

    return new Promise((resolve, reject) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");

        canvas.setAttribute("hidden", true);
        canvas.setAttribute("data-image-src", src);
        canvas.width = 1;
        canvas.height = 1;

        document.body.appendChild(canvas);

        canvas.getContext("2d").drawImage(imageNode, 0, 0);

        document.body.removeChild(canvas);

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
