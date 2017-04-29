<script src="./image.js"></script>
<style src="./image.css"></style>

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
        <img
          v-if="shouldPlaceholderRender"
          class="progressive-image-placeholder"
          :class="{ 'progressive-image-placeholder-out': shouldImageRender }"
          :style="blurStyle"
          :src="placeholderImage"
        />
      </transition>
    </div>
  </div>
</template>
