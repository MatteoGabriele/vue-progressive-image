<script setup lang="ts">
import useImage from "@/composables/useImage";
import useIntersect from "@/composables/useIntersect";
import {
  MAIN_IMAGE_LOAD_ERROR,
  MAIN_IMAGE_LOAD_SUCCESS,
  globalPropsKey,
} from "@/constants";
import type { ProgressiveImageProps } from "@/types";
import { computed, inject, onMounted, reactive, ref } from "vue";

const props = defineProps<ProgressiveImageProps>();
const globalProps = inject(globalPropsKey, {});
const mergedProps = reactive<ProgressiveImageProps>({
  ...props,
  ...globalProps,
});

const emit = defineEmits([MAIN_IMAGE_LOAD_SUCCESS, MAIN_IMAGE_LOAD_ERROR]);

const rootRef = ref(null);
const imageRef = ref(null);
const isMainImageRendered = ref(false);
const isFallbackImageRendered = ref(false);

const imageSrc = computed<string | undefined>(() => {
  return isFallbackImageRendered.value
    ? mergedProps.fallbackSrc
    : mergedProps.src;
});

const { isIntersected, watchIntersectionOnce } = useIntersect(rootRef);
const { loadImage, aspectRatio, width } = useImage(imageRef);
const isLoading = computed(() => !isMainImageRendered.value);

const paddingHack = computed(() => ({
  paddingBottom: `${aspectRatio.value * 100}%`,
}));

const componentStyle = computed(() => {
  if (mergedProps.objectCover || width.value === 0) {
    return;
  }

  return {
    maxWidth: `${width.value}px`,
  };
});

const imageClasses = computed(() => {
  return [
    mergedProps.customClass,
    {
      "v-progressive-image-object-cover": mergedProps.objectCover,
      "v-progressive-image-loading": isLoading.value,
    },
  ];
});

function toNumber(input: string | number | undefined): number {
  let value = 0;

  if (typeof input === "string") {
    value = Number.parseInt(input);
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
      }, toNumber(mergedProps.delay));
    })
    .catch((error) => {
      isMainImageRendered.value = true;
      isFallbackImageRendered.value = true;
      emit(MAIN_IMAGE_LOAD_ERROR, error);
    });
}

onMounted(() => {
  if (mergedProps.placeholderSrc && mergedProps.blur) {
    document.documentElement.style.setProperty(
      "--progressive-image-blur",
      `${toNumber(mergedProps.blur)}px`,
    );
  }

  if (mergedProps.src) {
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
        :css="!mergedProps.placeholderSrc"
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
