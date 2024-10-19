import {
  MaybeRef,
  nextTick,
  onMounted,
  onUnmounted,
  Ref,
  ref,
  toRef,
  watch,
} from "vue";
import { INTERSECTION_THRESHOLD } from "@/constants";

type UseIntersectResult = {
  isIntersecting: Ref<boolean>;
  isReady: Ref<boolean>;
  watchIntersectionOnce: (callback: () => void) => void;
};

export default function useIntersect(
  element: MaybeRef<HTMLElement | null>
): UseIntersectResult {
  let observer: IntersectionObserver;

  const elementRef = toRef(element);

  // This is needed to avoid element glitching before the observer initializes
  const isReady = ref(false);
  const isIntersecting = ref(false);

  const observeElement = () => {
    if (!elementRef.value) {
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        if (entries?.length) {
          const [entry] = entries;
          isIntersecting.value = entry.isIntersecting;
          isReady.value = true;
        }
      },
      {
        threshold: INTERSECTION_THRESHOLD,
      }
    );

    observer.observe(elementRef.value);
  };

  const watchIntersectionOnce = (callback: () => void) => {
    const stop = watch(
      isIntersecting,
      (is) => {
        if (is) {
          nextTick().then(callback);
          stop();
        }
      },
      { immediate: true }
    );
  };

  onUnmounted(() => {
    observer?.disconnect();
  });

  onMounted(observeElement);

  return {
    isIntersecting,
    watchIntersectionOnce,
    isReady,
  };
}
