<script src="./image.js"></script>
<style module src="./image.css"></style>
<template>
  <div :class="$style.component" :style="wrapperStyle">
    <transition
      :enter-class="$style.enter"
      :enter-active-class="$style.before">
      <img
        v-if="shouldImageRender"
        :class="$style.image"
        :src="image"
      />
    </transition>
    <transition
      :enter-class="$style.enter"
      :enter-active-class="$style.before">
      <img
        v-if="shouldPlaceholderRender"
        :class="shouldImageRender ? $style.out : $style.placeholder"
        :style="blurStyle"
        :src="placeholderImage"
      />
    </transition>
  </div>
</template>
