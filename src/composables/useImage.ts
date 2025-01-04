import {
  ref,
  computed,
  nextTick,
  unref,
  type Ref,
  type MaybeRef,
  type ComputedRef,
} from "vue";
import { IMAGE_POLL_INTERVAL, IMAGE_ASPECT_RATIO } from "@/constants";
import { getImage } from "@/utils";

type UseImageResult = {
  loadImage: () => Promise<void>;
  aspectRatio: Ref<number>;
  width: Ref<number>;
  height: Ref<number>;
};

const useImagePoll = (
  image: HTMLImageElement | null,
  callback: (payload: { width: number; height: number }) => void
): void => {
  if (!image) {
    return;
  }

  const pollImageData = setInterval(() => {
    if (image?.width && pollImageData) {
      clearInterval(pollImageData);
      callback({
        width: image.width,
        height: image.height,
      });
    }
  }, IMAGE_POLL_INTERVAL);
};

export const useImage = (
  element: MaybeRef<HTMLImageElement | null>
): UseImageResult => {
  const image: HTMLImageElement | null = getImage();
  const width = ref(0);
  const height = ref(0);

  useImagePoll(image, (data) => {
    width.value = data.width;
    height.value = data.height;
  });

  const aspectRatio: ComputedRef<number> = computed(() => {
    return width.value ? height.value / width.value : IMAGE_ASPECT_RATIO;
  });

  const imageRenderer = (imageNode: HTMLImageElement): void => {
    const canvas = document.createElement("canvas");

    canvas.width = 1;
    canvas.height = 1;

    canvas.setAttribute("hidden", "true");

    document.body.appendChild(canvas);

    canvas.getContext("2d")?.drawImage(imageNode, 0, 0);

    document.body.removeChild(canvas);
  };

  const loadImage = async (): Promise<void> => {
    if (!image) {
      return;
    }

    const imageNode = unref(element);

    if (!imageNode) {
      return;
    }

    const src = imageNode.src;

    image.src = src;

    if (image.complete) {
      return;
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
