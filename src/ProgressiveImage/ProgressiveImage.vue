<script setup>
import { ref, onMounted, computed } from "vue";
import {
  IMAGE_BLUR,
  MAIN_IMAGE_LOAD_SUCCESS,
  MAIN_IMAGE_LOAD_ERROR,
} from "@/constants";
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
  loadPlaceholder: {
    type: Boolean,
    default: false,
  },
  blur: {
    type: [Number, String],
    default: IMAGE_BLUR,
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
const placeholderRef = ref(null);
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
    .catch((error) => {
      isMainImageRendered.value = true;
      isFallbackImageRendered.value = true;
      emit(MAIN_IMAGE_LOAD_ERROR, error);
    });
};

onMounted(() => {
  const blur = props.blur * 1;

  if (props.placeholderSrc && blur !== IMAGE_BLUR) {
    placeholderRef.value.style.setProperty("--blur", `${blur}px`);
  }

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
        v-show="isMainImageRendered"
        ref="imageRef"
        class="v-progressive-image-main"
        :src="isFallbackImageRendered ? fallbackSrc : src"
        :alt="alt"
        :title="title"
      />

      <template v-if="placeholderSrc">
        <transition name="v-progressive-image-fade" appear>
          <img
            v-if="isLoading"
            ref="placeholderRef"
            class="v-progressive-image-placeholder"
            :loading="loadPlaceholder ? 'eager' : 'lazy'"
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
