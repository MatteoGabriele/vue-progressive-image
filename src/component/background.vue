<template>
  <div class="component">
    <div class="progressive-image-preloader">
      <slot :visible="!shouldImageRender"></slot>
    </div>
    <div v-if="!shouldImageRender">
      <canvas width="1" height="1" class="canvas" ref="canvas"></canvas>
      <img ref="main" :src="image" hidden>
    </div>
    <div :style="wrapperStyle">

      <div v-if="cached" class="image" :style="imageStyle"></div>

      <transition
        v-else
        enter-class="enter"
        enter-active-class="before">
        <div v-if="shouldImageRender" class="image" :style="imageStyle"></div>
      </transition>

      <div class="slot">
        <slot />
      </div>

      <transition
        v-if="!cached"
        enter-class="enter"
        enter-active-class="before">
        <div v-if="shouldPlaceholderRender" class="placeholder" :style="placeholderStyle"></div>
      </transition>
    </div>
  </div>
</template>

<script>
  import image from '../mixin/image'

  export default {
    name: 'progressive-background',

    props: {
      noRatio: {
        type: Boolean,
        required: false
      }
    },

    mixins: [
      image
    ],

    data () {
      return {
        applyRatio: !this.noRatio
      }
    },

    computed: {
      imageStyle () {
        return {
          backgroundImage: `url(${this.image})`
        }
      },

      placeholderStyle () {
        return {
          ...this.blurStyle,
          backgroundImage: `url(${this.placeholderImage})`
        }
      }
    }
  }
</script>

<style lang="css">
  .component {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .slot {
    position: relative;
    z-index: 1;
  }

  .canvas {
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }

  .image, .placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    transition: all 0.4s ease-out;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .placeholder {
    transform: scale(1.1);
    z-index: 0;
  }

  .before {
    opacity: 1;
  }

  .enter {
    opacity: 0;
  }

  .progressive-image-preloader {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
</style>
