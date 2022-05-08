<script setup>
import { ref, onMounted, computed } from "vue";
import useImage from "@/composables/useImage";
import useIntersect from "@/composables/useIntersect";
import {
  MAIN_IMAGE_LOAD_SUCCESS,
  MAIN_IMAGE_LOAD_ERROR,
  IMAGE_RENDERING_DELAY,
  IMAGE_BLUR,
  IMAGE_ASPECT_RATIO,
} from "@/constants";

const emit = defineEmits([MAIN_IMAGE_LOAD_SUCCESS, MAIN_IMAGE_LOAD_ERROR]);

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  placeholderSrc: {
    type: String,
  },
  fallbackSrc: {
    type: String,
  },
  delay: {
    type: [Number, String],
    default: IMAGE_RENDERING_DELAY,
  },
  blur: {
    type: [Number, String],
    default: IMAGE_BLUR,
  },
  alt: {
    type: String,
  },
  aspectRatio: {
    type: [Number, String],
    default: IMAGE_ASPECT_RATIO,
  },
});

const rootRef = ref(null);
const mainImageRef = ref(null);
const isMainImageRendered = ref(false);
const isFallbackImageRendered = ref(false);
const isLoading = computed(() => !isMainImageRendered.value);

const { isIntersected, watchIntersectionOnce } = useIntersect(rootRef);
const { loadImage, aspectRatio, naturalWidth } = useImage(mainImageRef, {
  imageAspectRatio: props.aspectRatio,
});

const paddingHack = computed(() => {
  const padding = aspectRatio.value * 100;

  return {
    paddingBottom: `${padding}%`,
  };
});

const componentStyle = computed(() => {
  return {
    maxWidth: naturalWidth.value ? `${naturalWidth.value}px` : "100%",
  };
});

const placeholderStyle = computed(() => {
  const blurAmount = props.blur * 1;

  return {
    filter: `blur(${blurAmount}px)`,
  };
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
  watchIntersectionOnce(onComponentIntersected);
});
</script>

<template>
  <div ref="rootRef" class="v-progressive-image" :style="componentStyle">
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
        <transition
          appear
          leave-class="v-progressive-image-fade-leave"
          leave-to-class="v-progressive-image-fade-leave-to"
          leave-active-class="v-progressive-image-fade-leave-active"
        >
          <img
            v-if="isLoading"
            loading="lazy"
            class="v-progressive-image-placeholder"
            :style="placeholderStyle"
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
