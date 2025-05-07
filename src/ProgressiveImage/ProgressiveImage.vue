<script setup lang="ts">
import { ref, onMounted, computed, useTemplateRef, inject } from "vue";
import { MAIN_IMAGE_LOAD_SUCCESS, MAIN_IMAGE_LOAD_ERROR } from "@/constants";
import useImage from "@/composables/useImage";
import useIntersect from "@/composables/useIntersect";
import { ProgressiveImageConfigKey } from "..";

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
const globalProps = inject<Partial<ProgressiveImageProps>>(
  ProgressiveImageConfigKey,
  {}
);

const mergedProps = computed<ProgressiveImageProps>(() => ({
  ...globalProps,
  ...props,
}));

const emit = defineEmits([MAIN_IMAGE_LOAD_SUCCESS, MAIN_IMAGE_LOAD_ERROR]);

const rootRef = useTemplateRef("rootRef");
const imageRef = useTemplateRef("imageRef");
const isMainImageRendered = ref(false);
const isFallbackImageRendered = ref(false);

const imageSrc = computed<string | undefined>(() => {
  return isFallbackImageRendered.value
    ? mergedProps.value.fallbackSrc
    : mergedProps.value.src;
});

const { isIntersected, watchIntersectionOnce } = useIntersect(rootRef);
const { loadImage, aspectRatio, width } = useImage(imageRef);
const isLoading = computed(() => !isMainImageRendered.value);

const paddingHack = computed(() => ({
  paddingBottom: `${aspectRatio.value * 100}%`,
}));

const componentStyle = computed(() => {
  if (mergedProps.value.objectCover || width.value === 0) {
    return;
  }

  return {
    maxWidth: `${width.value}px`,
  };
});

const imageClasses = computed(() => {
  return [
    mergedProps.value.customClass,
    {
      "v-progressive-image-object-cover": mergedProps.value.objectCover,
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
      }, toNumber(mergedProps.value.delay));
    })
    .catch((error) => {
      isMainImageRendered.value = true;
      isFallbackImageRendered.value = true;
      emit(MAIN_IMAGE_LOAD_ERROR, error);
    });
}

onMounted(() => {
  if (mergedProps.value.placeholderSrc && mergedProps.value.blur) {
    document.documentElement.style.setProperty(
      "--progressive-image-blur",
      `${toNumber(mergedProps.value.blur)}px`
    );
  }

  if (mergedProps.value.src) {
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
          :alt="mergedProps.alt"
          :title="mergedProps.title"
        />
      </transition>

      <template v-if="mergedProps.placeholderSrc">
        <transition name="v-progressive-image-placeholder-fade" appear>
          <img
            v-if="isLoading"
            class="v-progressive-image-placeholder"
            :loading="mergedProps.lazyPlaceholder ? 'lazy' : 'eager'"
            :src="mergedProps.placeholderSrc"
          />
        </transition>
      </template>

      <div v-if="$slots.default" class="v-progressive-image-slot-default">
        <slot :isLoading="isLoading" />
      </div>
    </div>
  </div>
</template>
