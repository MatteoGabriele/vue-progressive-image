<template>
  <div ref="image" class="progressive-image">
    <div class="progressive-image-wrapper" :style="wrapperStyle">
      <transition
        enter-class="progressive-image-enter"
        enter-active-class="progressive-image-before-enter">
        <img
          v-if="shouldImageRender"
          class="progressive-image-main"
          :src="image"
        />
      </transition>
      <transition
        enter-class="progressive-image-enter"
        enter-active-class="progressive-image-before-enter">
        <div
          v-if="shouldPlaceholderRender"
          class="progressive-image-placeholder"
          :class="{ 'progressive-image-placeholder-out': shouldImageRender }"
          :style="placeholderStyle">
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import image from '../mixin/image'

  export default {
    name: 'progressive-img',

    mixins: [
      image
    ],

    computed: {
      placeholderStyle () {
        return {
          ...this.blurStyle,
          'background-image': `url(${this.placeholder})`
        }
      }
    }
  }
</script>

<style lang="css">
  .progressive-image {
    position: relative;
    overflow: hidden;
  }

  .progressive-image-main {
    position: absolute;
    top: -10px;
    left: -10px;
    width: auto;
    max-width: calc(100% + 20px);
    z-index: 1;
    transition-duration: 1s;
    transition-property: all;
    transition-timing-function: ease-out;
    transform: translateZ(0);
  }

  .progressive-image-before-enter {
    opacity: 1;
  }

  .progressive-image-enter {
    opacity: 0;
  }

  .progressive-image-placeholder {
    position: absolute;
    top: -8px;
    left: -8px;
    z-index: 0;
    overflow: hidden;
    transition-duration: 500ms;
    transition-property: all;
    transition-timing-function: ease-out;
    backface-visibility: hidden;
    transform: translateZ(0) scale(1.2);
    width: 100%;
    height: 100%;
    background-size: cover;
  }

  .progressive-image-placeholder-out {
    transition-duration: inherit;
    transition-property: all;
    transition-timing-function: ease-out;
    transition-delay: 1.2s;
    opacity: 0;
  }
</style>
