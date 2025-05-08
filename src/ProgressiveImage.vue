<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { MAIN_IMAGE_LOAD_SUCCESS, MAIN_IMAGE_LOAD_ERROR } from "@/constants";
import useImage from "@/composables/useImage";
import useIntersect from "@/composables/useIntersect";

export type ProgressiveImageProps = {
  src: string;
  placeholderSrc?: string;
  fallbackSrc?: string;
  alt?: string;
  title?: string;
  customClass?: string;
  blur?: number | string;
  lazyPlaceholder?: boolean;
  delay?: number | string;
  objectCover?: boolean;
};

const props = defineProps<ProgressiveImageProps>();
const emit = defineEmits([MAIN_IMAGE_LOAD_SUCCESS, MAIN_IMAGE_LOAD_ERROR]);

const rootRef = ref(null);
const imageRef = ref(null);
const isMainImageRendered = ref(false);
const isFallbackImageRendered = ref(false);

const imageSrc = computed<string | undefined>(() => {
  return isFallbackImageRendered.value ? props.fallbackSrc : props.src;
});

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

function toNumber(input: string | number | undefined): number {
  let value: number = 0;

  if (typeof input === "string") {
    value = parseInt(input);
  } else if (typeof input === "number") {
    value = input;
  }

  return value;
}

function mainImageHandler() {
  loadImage()
    .then(() => {
      setTimeout(() => {
        isMainImageRendered.value = true;
        emit(MAIN_IMAGE_LOAD_SUCCESS);
      }, toNumber(props.delay));
    })
    .catch((error) => {
      isMainImageRendered.value = true;
      isFallbackImageRendered.value = true;
      emit(MAIN_IMAGE_LOAD_ERROR, error);
    });
}

onMounted(() => {
  if (props.placeholderSrc && props.blur) {
    document.documentElement.style.setProperty(
      "--progressive-image-blur",
      `${toNumber(props.blur)}px`
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
          :src="imageSrc"
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
