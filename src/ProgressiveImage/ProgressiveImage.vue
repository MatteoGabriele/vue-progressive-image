<script setup>
import { ref, onMounted, computed } from "vue";
import { MAIN_IMAGE_LOAD_SUCCESS, MAIN_IMAGE_LOAD_ERROR } from "@/constants";
import useImage from "@/composables/useImage";
import useIntersect from "@/composables/useIntersect";

const emit = defineEmits([MAIN_IMAGE_LOAD_SUCCESS, MAIN_IMAGE_LOAD_ERROR]);

const props = defineProps({
  src: String,
  placeholderSrc: String,
  fallbackSrc: String,
  alt: String,
  title: String,
  customClass: String,
  blur: [Number, String],
  lazyPlaceholder: {
    type: Boolean,
    default: false,
  },
  delay: {
    type: [Number, String],
    default: 0,
  },
  objectCover: {
    type: Boolean,
    default: false,
  },
});

const rootRef = ref(null);
const imageRef = ref(null);
const isMainImageRendered = ref(false);
const isFallbackImageRendered = ref(false);

const { isIntersected, watchIntersectionOnce } = useIntersect(rootRef);
const { loadImage, aspectRatio, width } = useImage(imageRef);
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
      "v-progressive-image-loading": isLoading.value,
    },
  ];
});

const mainImageHandler = () => {
  loadImage()
    .then(() => {
      setTimeout(() => {
        isMainImageRendered.value = true;
        emit(MAIN_IMAGE_LOAD_SUCCESS);
      }, props.delay * 1);
    })
    .catch((error) => {
      isMainImageRendered.value = true;
      isFallbackImageRendered.value = true;
      emit(MAIN_IMAGE_LOAD_ERROR, error);
    });
};

onMounted(() => {
  if (props.placeholderSrc && props.blur) {
    document.documentElement.style.setProperty(
      "--progressive-image-blur",
      `${props.blur * 1}px`
    );
  }

  if (props.src) {
    watchIntersectionOnce(mainImageHandler);
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
      <transition
        :css="!placeholderSrc"
        name="v-progressive-image-main-fade"
        appear
      >
        <img
          v-if="isIntersected"
          v-show="isMainImageRendered"
          ref="imageRef"
          class="v-progressive-image-main"
          :src="isFallbackImageRendered ? fallbackSrc : src"
          :alt="alt"
          :title="title"
        />
      </transition>

      <template v-if="placeholderSrc">
        <transition name="v-progressive-image-placeholder-fade" appear>
          <img
            v-if="isLoading"
            class="v-progressive-image-placeholder"
            :loading="lazyPlaceholder ? 'lazy' : 'eager'"
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
