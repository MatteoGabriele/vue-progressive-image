<script lang="ts" setup>
import {
  ref,
  onMounted,
  computed,
  inject,
  type ComputedRef,
  type Ref,
} from "vue";
import { useImage } from "@/composables/useImage";
import { useIntersect } from "@/composables/useIntersect";
import type {
  CssClasses,
  InlineStyle,
  ProgressiveImagePluginOptions,
  ProgressiveImageProps,
} from "@/types";

const emit = defineEmits<{
  success: [];
  error: [any];
}>();

const pluginOptions = inject<ProgressiveImagePluginOptions>(
  "pluginOptions",
  {}
);
const props = withDefaults(defineProps<ProgressiveImageProps>(), {
  lazyPlaceholder: false,
  objectCover: false,
});

const rootRef: Ref<HTMLElement | null> = ref(null);
const imageRef: Ref<HTMLImageElement | null> = ref(null);
const isMainImageRendered = ref(false);
const isFallbackImageRendered = ref(false);

const { watchIntersectionOnce, hasIntersectedOnce, isReady } =
  useIntersect(rootRef);

const { loadImage, aspectRatio, width, height } = useImage(imageRef);
const isLoading = computed(() => !isMainImageRendered.value);

const paddingHack: ComputedRef<InlineStyle> = computed(() => ({
  paddingBottom: `${aspectRatio.value * 100}%`,
}));

const componentStyle: ComputedRef<InlineStyle | undefined> = computed(() => {
  if (props.objectCover || width.value === 0) {
    return;
  }

  return {
    maxWidth: `${width.value}px`,
  };
});

const imageClasses: ComputedRef<CssClasses[]> = computed(() => {
  return [
    pluginOptions.customClass,
    props.customClass,
    {
      "v-progressive-image-object-cover": props.objectCover,
      "v-progressive-image-loading": isLoading.value,
    },
  ];
});

const mainImageSrc: ComputedRef<string> = computed(() => {
  const fallbackSrc = props.fallbackSrc || pluginOptions.fallbackSrc;

  if (isFallbackImageRendered.value && fallbackSrc) {
    return fallbackSrc;
  }

  return props.src;
});

const placeholderImageLoadingType: ComputedRef<"lazy" | "eager"> = computed(
  () => {
    return props.lazyPlaceholder || pluginOptions.lazyPlaceholder
      ? "lazy"
      : "eager";
  }
);

const delay: ComputedRef<number> = computed(() => {
  const delayValue = props.delay || pluginOptions.delay || 0;
  return parseInt(delayValue.toString());
});

const mainImageHandler = (): void => {
  loadImage()
    .then(() => {
      setTimeout(() => {
        isMainImageRendered.value = true;
        emit("success");
      }, delay.value);
    })
    .catch((error) => {
      isMainImageRendered.value = true;
      isFallbackImageRendered.value = true;
      emit("error", error);
    });
};

onMounted(() => {
  const blur = props.blur || pluginOptions.blur;

  if (props.placeholderSrc && blur) {
    document.documentElement.style.setProperty(
      "--progressive-image-blur",
      `${blur}px`
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
          v-if="hasIntersectedOnce && isReady"
          v-show="isMainImageRendered"
          ref="imageRef"
          class="v-progressive-image-main"
          :src="mainImageSrc"
          :title="title"
          :alt="alt"
          :width="width"
          :height="height"
        />
      </transition>

      <template v-if="placeholderSrc">
        <transition name="v-progressive-image-placeholder-fade" appear>
          <img
            v-if="isLoading"
            class="v-progressive-image-placeholder"
            :loading="placeholderImageLoadingType"
            :src="placeholderSrc"
            :alt="alt"
            :title="title"
          />
        </transition>
      </template>

      <div v-if="$slots.default" class="v-progressive-image-slot-default">
        <slot :isLoading="isLoading" />
      </div>
    </div>
  </div>
</template>
