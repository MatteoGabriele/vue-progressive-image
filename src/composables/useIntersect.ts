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

/**
 * Sets up a reactive intersection observer on a DOM element and provides utilities for responding to its intersection state.
 *
 * @param element - A reactive or non-reactive reference to an HTMLElement or null to observe for intersection.
 * @returns An object containing:
 *   - `isIntersected`: A reactive boolean indicating if the element has intersected the viewport.
 *   - `watchIntersectionOnce`: A function to register a callback that runs once when the element first intersects.
 *
 * @remark The observer disconnects automatically after the element first intersects or when the component is unmounted.
 */
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
