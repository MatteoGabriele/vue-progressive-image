import { INTERSECTION_THRESHOLD } from "@/constants";
import {
  type MaybeRef,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  unref,
  watch,
} from "vue";

export default function useIntersect(element: MaybeRef<HTMLElement | null>) {
  const isIntersected = ref(false);
  const options = { threshold: INTERSECTION_THRESHOLD };
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isIntersected.value = true;
      observer.disconnect();
    }
  }, options);

  const watchIntersectionOnce = (callback: () => void) => {
    const stop = watch(
      isIntersected,
      (is) => {
        if (is) {
          nextTick().then(callback);
          stop();
        }
      },
      { immediate: true },
    );
  };

  onMounted(() => {
    const el = unref(element);

    if (!el) {
      return;
    }

    observer.observe(el);
  });

  onUnmounted(() => {
    observer.disconnect();
  });

  return {
    watchIntersectionOnce,
    isIntersected,
  };
}
