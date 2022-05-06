import { onMounted, onUnmounted, ref } from "vue";

export default (element) => {
  const isIntersected = ref(false);
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isIntersected.value = true;
        observer.disconnect();
      }
    },
    {
      threshold: [0.2],
    }
  );

  onMounted(() => {
    observer.observe(element.value);
  });

  onUnmounted(() => {
    observer.disconnect();
  });

  return {
    isIntersected,
  };
};
