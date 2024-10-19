import { ref, computed, nextTick, unref, Ref, MaybeRef } from "vue";
import { IMAGE_POLL_INTERVAL, IMAGE_ASPECT_RATIO } from "@/constants";

type UseImageResult = {
  loadImage: () => Promise<void>;
  aspectRatio: Ref<number>;
  width: Ref<number>;
  height: Ref<number>;
};

export default function useImage(
  element: MaybeRef<HTMLImageElement | null>
): UseImageResult {
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

  const imageRenderer = (imageNode: HTMLImageElement) => {
    const canvas = document.createElement("canvas");

    canvas.width = 1;
    canvas.height = 1;

    canvas.setAttribute("hidden", "true");

    document.body.appendChild(canvas);

    canvas.getContext("2d")?.drawImage(imageNode, 0, 0);

    document.body.removeChild(canvas);
  };

  const loadImage = async (): Promise<void> => {
    const imageNode = unref(element);

    if (!imageNode) {
      return;
    }

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
}
