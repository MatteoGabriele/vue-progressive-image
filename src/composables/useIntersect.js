import { isRef, onMounted, onUnmounted, ref } from "vue";
import { INTERSECTION_THRESHOLD } from "@/constants";

export default (element, { threshold = INTERSECTION_THRESHOLD }) => {
  const isIntersected = ref(false);
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isIntersected.value = true;
        observer.disconnect();
      }
    },
    {
      threshold,
    }
  );

  onMounted(() => {
    const el = isRef(element) ? element.value : element;
    observer.observe(el);
  });

  onUnmounted(() => {
    observer.disconnect();
  });

  return {
    isIntersected,
  };
};
