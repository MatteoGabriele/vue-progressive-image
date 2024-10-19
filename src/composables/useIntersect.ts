import { isRef, onMounted, onUnmounted, nextTick, ref, watch } from "vue";
import { INTERSECTION_THRESHOLD } from "@/constants";

export const useIntersect = (element) => {
  const isIntersected = ref(false);
  const options = { threshold: INTERSECTION_THRESHOLD };
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isIntersected.value = true;
      observer.disconnect();
    }
  }, options);

  const watchIntersectionOnce = (callback) => {
    const stop = watch(
      isIntersected,
      (is) => {
        if (is) {
          nextTick().then(callback);
          stop();
        }
      },
      { immediate: true }
    );
  };

  onMounted(() => {
    const el = isRef(element) ? element.value : element;
    observer.observe(el);
  });

  onUnmounted(() => {
    observer.disconnect();
  });

  return {
    watchIntersectionOnce,
    isIntersected,
  };
};

export default useIntersect;
