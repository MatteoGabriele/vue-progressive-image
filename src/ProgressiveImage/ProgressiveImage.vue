<script setup>
import { ref, onMounted, computed } from "vue";
import componentProps from "./props";
import componentEmits from "./emits";
import useImage from "@/composables/useImage";
import useIntersect from "@/composables/useIntersect";
import { MAIN_IMAGE_LOAD_SUCCESS, MAIN_IMAGE_LOAD_ERROR } from "@/constants";

const emit = defineEmits(componentEmits);
const props = defineProps(componentProps);

const rootRef = ref(null);
const mainImageRef = ref(null);
const isMainImageRendered = ref(false);
const isFallbackImageRendered = ref(false);

const { isIntersected, watchIntersectionOnce } = useIntersect(rootRef);
const { loadImage, aspectRatio, width } = useImage(mainImageRef);
const isLoading = computed(() => !isMainImageRendered.value);

const paddingHack = computed(() => ({
  paddingBottom: `${aspectRatio.value * 100}%`,
}));

const componentStyle = computed(() => {
  if (props.objectCover || width.value === 0) {
    return;
  }

  return {
    maxWidth: `${width.value}px`,
  };
});

const imageClasses = computed(() => {
  return [
    props.customClass,
    {
      "v-progressive-image-object-cover": props.objectCover,
    },
  ];
});

const onComponentIntersected = () => {
  loadImage()
    .then(() => {
      setTimeout(() => {
        isMainImageRendered.value = true;
        emit(MAIN_IMAGE_LOAD_SUCCESS);
      }, props.delay * 1);
    })
    .catch(() => {
      isMainImageRendered.value = true;
      isFallbackImageRendered.value = true;
      emit(MAIN_IMAGE_LOAD_ERROR, error);
    });
};

onMounted(() => {
  if (props.src) {
    watchIntersectionOnce(onComponentIntersected);
  }
});
</script>

<template>
  <div
    ref="rootRef"
    class="v-progressive-image"
    :class="imageClasses"
    :style="componentStyle"
  >
    <div :style="paddingHack">
      <img
        v-if="isIntersected"
        class="v-progressive-image-main"
        v-show="isMainImageRendered"
        ref="mainImageRef"
        :src="isFallbackImageRendered ? fallbackSrc : src"
        :alt="alt"
      />

      <template v-if="placeholderSrc">
        <svg class="v-progressive-image-svg" v-if="isLoading">
          <filter id="v-progressive-image-filter">
            <feGaussianBlur in="SourceGraphic" :stdDeviation="blur" />
          </filter>
        </svg>
        <transition name="v-progressive-image-fade" appear>
          <img
            v-if="isLoading"
            loading="lazy"
            class="v-progressive-image-placeholder"
            :src="placeholderSrc"
          />
        </transition>
      </template>

      <div v-if="$slots.default" class="v-progressive-image-slot-default">
        <slot :isLoading="isLoading" />
      </div>
    </div>
  </div>
</template>
