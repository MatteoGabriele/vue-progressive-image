<template>
  <div class="v-progressive-image" :style="componentStyle">
    <div :style="paddingHack">
      <img
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

        <canvas v-if="isLoading" hidden width="1" height="1" ref="canvasRef" />
      </template>

      <div v-if="$slots.default" class="v-progressive-image-slot-default">
        <slot :isLoading="isLoading" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { MAIN_IMAGE_LOAD_SUCCESS, MAIN_IMAGE_LOAD_ERROR } from "./constants";
import useImage from "./use/image";
import useObjectToArray from "./use/objectToArray";
import props from "./props";

export default {
  name: "ProgressiveImage",

  emits: [MAIN_IMAGE_LOAD_SUCCESS, MAIN_IMAGE_LOAD_ERROR],

  props,

  setup(props, { emit }) {
    const canvasRef = ref(null);
    const mainImageRef = ref(null);
    const mainImage = useImage(props.src, {
      imageAspectRatio: props.aspectRatio,
    });
    const isMainImageRendered = ref(false);
    const isFallbackImageRendered = ref(false);
    const isLoading = computed(() => !isMainImageRendered.value);
    const imageClasses = computed(() => {
      return useObjectToArray({
        "v-progressive-image-object-cover": props.objectCover,
        "v-progressive-image-object-contain": props.objectContain,
        "v-progressive-image-select-none": props.selectNone,
      });
    });

    const paddingHack = computed(() => {
      const padding = mainImage.aspectRatio.value * 100;

      return {
        paddingBottom: `${padding}%`,
      };
    });

    const componentMaxWidth = computed(() => {
      if (props.objectCover || props.objectContain) {
        return "auto";
      }

      if (mainImage.naturalWidth.value) {
        return `${mainImage.naturalWidth.value}px`;
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

    const loadMainImage = () => {
      mainImage.onLoad(() => {
        let canvasCtx;

        try {
          canvasCtx = canvasRef.value.getContext("2d");
          canvasCtx.drawImage(mainImageRef.value, 0, 0);
        } catch {
          // Nobody needs to know!
          // see https://github.com/MatteoGabriele/vue-v-progressive-image/issues/30
        }

        setTimeout(() => {
          isMainImageRendered.value = true;
          emit(MAIN_IMAGE_LOAD_SUCCESS);
        }, props.delay * 1);
      });

      mainImage.onError((error) => {
        isMainImageRendered.value = true;
        isFallbackImageRendered.value = true;
        emit(MAIN_IMAGE_LOAD_ERROR, error);
      });
    };

    onMounted(() => {
      loadMainImage();
    });

    return {
      canvasRef,
      mainImageRef,
      isMainImageRendered,
      isFallbackImageRendered,
      paddingHack,
      componentStyle,
      placeholderStyle,
      isLoading,
      imageClasses,
    };
  },
};
</script>

<style>
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
