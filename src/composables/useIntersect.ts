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
  hasIntersectedOnce: Ref<boolean>;
  isReady: Ref<boolean>;
  watchIntersectionOnce: (callback: () => void) => void;
};

export default function useIntersect(
  element: MaybeRef<HTMLElement | null>
): UseIntersectResult {
  let observer: IntersectionObserver;

  const elementRef = toRef(element);

  const isReady = ref(false);
  const isIntersecting = ref(false);
  const hasIntersectedOnce = ref(false);

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
    const unwatch = watch(
      isIntersecting,
      (is) => {
        if (is && !hasIntersectedOnce.value) {
          nextTick().then(callback);
          unwatch();
          hasIntersectedOnce.value = true;
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
    hasIntersectedOnce,
    watchIntersectionOnce,
    isReady,
  };
}
