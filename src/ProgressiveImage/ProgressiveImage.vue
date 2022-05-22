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
const placeholderImageRef = ref(null);
const canvasRef = ref(null);
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
  if (props.placeholderSrc) {
    const canvas = canvasRef.value;
    const ctx = canvas.getContext("2d");
    const img = placeholderImageRef.value;
    const blur = props.blur;
    const width = rootRef.value.clientWidth;
    const height = rootRef.value.clientHeight;

    canvas.width = width;
    canvas.height = height;

    img.onload = () => {
      ctx.filter = `blur(${blur}px)`;
      ctx.drawImage(img, -blur, -blur, width + blur * 2, height + blur * 2);
    };
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
        class="v-progressive-image-main"
        v-show="isMainImageRendered"
        ref="mainImageRef"
        :src="isFallbackImageRendered ? fallbackSrc : src"
        :alt="alt"
      />

      <template v-if="placeholderSrc">
        <img
          ref="placeholderImageRef"
          loading="lazy"
          class="v-progressive-image-placeholder"
          :src="placeholderSrc"
        />
        <transition name="v-progressive-image-fade" appear>
          <canvas
            v-if="isLoading"
            ref="canvasRef"
            class="v-progressive-image-canvas"
          ></canvas>
        </transition>
      </template>

      <div v-if="$slots.default" class="v-progressive-image-slot-default">
        <slot :isLoading="isLoading" />
      </div>
    </div>
  </div>
</template>
