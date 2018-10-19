<template>
  <div :class="['progressive-background', customClass]">
    <div v-if="cached" :style="wrapperStyle">
      <div class="progressive-background-image" :style="imageStyle"></div>
      <div class="progressive-background-slot">
        <slot name="content" />
      </div>
    </div>
    <span v-else>
      <div v-if="!shouldImageRender">
        <canvas
          width="1"
          height="1"
          class="progressive-background-canvas"
          ref="canvas">
        </canvas>
        <img ref="main" :src="image" hidden>
      </div>
      <div :style="wrapperStyle">
        <transition
          enter-class="progressive-background-enter"
          enter-active-class="progressive-background-before">
          <div v-if="shouldImageRender" class="progressive-background-image" :style="imageStyle"></div>
        </transition>
        <div class="progressive-background-slot">
          <slot name="content" :visible="!shouldImageRender" />
        </div>
        <transition
          enter-class="progressive-background-enter"
          enter-active-class="progressive-background-before">
          <div
            v-if="shouldPlaceholderRender"
            class="progressive-background-placeholder"
            :style="placeholderStyle">
          </div>
        </transition>
      </div>
    </span>
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
  .progressive-background {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .progressive-background-slot {
    position: relative;
    z-index: 1;
  }

  .progressive-background-canvas {
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }

  .progressive-background-image {
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

  .progressive-background-placeholder {
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
    transform: scale(1.1);
    z-index: 0;
  }

  .progressive-background-before {
    opacity: 1;
  }

  .progressive-background-enter {
    opacity: 0;
  }

  .progressive-background-preloader {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
</style>
