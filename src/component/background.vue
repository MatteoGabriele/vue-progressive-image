<template>
  <div :class="$style.component">
    <div :style="wrapperStyle">
      <transition
        :enter-class="$style.enter"
        :enter-active-class="$style.before">
        <div v-if="shouldImageRender" :class="$style.image" :style="imageStyle"></div>
      </transition>

      <transition
        :enter-class="$style.enter"
        :enter-active-class="$style.before">
        <div v-if="shouldPlaceholderRender" :class="$style.placeholder" :style="placeholderStyle"></div>
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

<style module lang="css">
  .component {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    transition: all 1s ease-out;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    transform: translateZ(0);
  }

  .placeholder {
    composes: image;
    transform: translateZ(0) scale(1);
    z-index: 0;
  }

  .before {
    opacity: 1;
  }

  .enter {
    opacity: 0;
  }
</style>
