<template>
  <div ref="rootRef" class="v-progressive-image" :style="componentStyle">
    <div :style="paddingHack">
      <img
        v-if="isIntersected"
        class="v-progressive-image-main"
        :class="imageClasses"
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

<script setup>
import { ref, nextTick, onMounted, computed, watch } from "vue";
import useImage from "@/composables/useImage";
import useIntersect from "@/composables/useIntersect";
import { objectToArray } from "@/utils";
import {
  MAIN_IMAGE_LOAD_SUCCESS,
  MAIN_IMAGE_LOAD_ERROR,
  IMAGE_RENDERING_DELAY,
  IMAGE_BLUR,
  IMAGE_ASPECT_RATIO,
  INTERSECTION_THRESHOLD,
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
  circle: {
    type: Boolean,
    default: false,
  },
  objectCover: {
    type: Boolean,
    default: false,
  },
  objectContain: {
    type: Boolean,
    default: false,
  },
  selectNone: {
    type: Boolean,
    default: false,
  },
  aspectRatio: {
    type: [Number, String],
    default: IMAGE_ASPECT_RATIO,
  },
  intersectionThreshold: {
    type: [Number, String],
    default: INTERSECTION_THRESHOLD,
  },
});

console.log(props.intersectionThreshold);

const rootRef = ref(null);
const mainImageRef = ref(null);
const isMainImageRendered = ref(false);
const isFallbackImageRendered = ref(false);
const isLoading = computed(() => !isMainImageRendered.value);
const imageClasses = computed(() => {
  return objectToArray({
    "v-progressive-image-object-cover": props.objectCover,
    "v-progressive-image-object-contain": props.objectContain,
    "v-progressive-image-select-none": props.selectNone,
  });
});

const { isIntersected } = useIntersect(rootRef, {
  threshold: props.intersectionThreshold * 1,
});
const { loadImage, aspectRatio, naturalWidth } = useImage(mainImageRef, {
  imageAspectRatio: props.aspectRatio,
});

const paddingHack = computed(() => {
  const padding = aspectRatio.value * 100;

  return {
    paddingBottom: `${padding}%`,
  };
});

const componentMaxWidth = computed(() => {
  if (props.objectCover || props.objectContain) {
    return "auto";
  }

  if (naturalWidth.value) {
    return `${naturalWidth.value}px`;
  }

  return "100%";
});

const componentStyle = computed(() => {
  return {
    borderRadius: props.circle ? "50%" : 0,
    maxWidth: componentMaxWidth.value,
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
  const stopWatcher = watch(
    isIntersected,
    (value) => {
      if (value) {
        nextTick().then(onComponentIntersected);
        stopWatcher();
      }
    },
    { immediate: true }
  );
});
</script>

<style>
.v-progressive-image,
.v-progressive-image *,
.v-progressive-image *:before,
.v-progressive-image *:after {
  box-sizing: border-box;
}

.v-progressive-image {
  position: relative;
  overflow: hidden;
  width: 100%;
  display: inline-block;
}

.v-progressive-image-main {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 0;
  max-width: 100%;
  max-height: 100%;
}

.v-progressive-image-object-cover {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.v-progressive-image-object-contain {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.v-progressive-image-object-contain {
  user-select: none;
}

.v-progressive-image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  transform: scale(1.2);
  object-fit: cover;
  user-select: none;
}

.v-progressive-image-slot-default {
  position: relative;
  z-index: 2;
}

.v-progressive-image-fade-leave,
.v-progressive-image-fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.v-progressive-image-fade-leave-to {
  opacity: 0;
}
</style>
