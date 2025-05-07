import { computed, type MaybeRef, nextTick, ref, unref } from "vue";
import { IMAGE_ASPECT_RATIO, IMAGE_POLL_INTERVAL } from "@/constants";

export default function useImage(element: MaybeRef<HTMLImageElement | null>) {
  const image = new Image();
  const width = ref(0);
  const height = ref(0);

  const aspectRatio = computed(() => {
    return width.value ? height.value / width.value : IMAGE_ASPECT_RATIO;
  });

  const pollImageData = setInterval(() => {
    if (image?.width) {
      clearInterval(pollImageData);

      width.value = image.width;
      height.value = image.height;
    }
  }, IMAGE_POLL_INTERVAL);

  const imageRenderer = (imageNode: HTMLImageElement) => {
    const canvas = document.createElement("canvas");

    canvas.width = 1;
    canvas.height = 1;

    canvas.setAttribute("hidden", 'true');

    document.body.appendChild(canvas);
    
    canvas.getContext('2d')?.drawImage(imageNode,0,0)

    document.body.removeChild(canvas);
  };

  async function loadImage(): Promise<void> {
    const imageNode = unref(element);
    
    if (!imageNode) {
      return
    }
    
    const src = imageNode.src;

    image.src = src;

    if (image.complete) {
      return
    }

    return new Promise<void>((resolve, reject) => {
      image.onload = () => {
        imageRenderer(imageNode);
        nextTick(() => resolve());
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
