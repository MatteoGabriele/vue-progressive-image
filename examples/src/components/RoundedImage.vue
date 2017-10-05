<template>
  <div class="wrapper">
    <h2>Rounded image</h2>
    <progressive-background
      class="image"
      src="/static/image-6.jpg"
      placeholder="/static/placeholder-6.jpg"
    />
  </div>
</template>

<script>
export default {
  name: 'roundedImage'
}
</script>

<style scoped>
  .image {
    border-radius: 50%;
    overflow: hidden;
    width: 400px;
    height: 400px;
    margin: 0 auto;
  }
</style>
