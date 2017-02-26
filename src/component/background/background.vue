<script src="./background.js"></script>
<style module src="./background.css"></style>
<template>
  <div :class="$style.component" :style="wrapperStyle">
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
</template>
