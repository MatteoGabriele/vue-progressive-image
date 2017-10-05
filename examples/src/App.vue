<template>
  <div id="app">
    <PlainImage class="example" />
    <PlainImageWithCustomBlur class="example"/>
    <Background class="example" />
    <RoundedImage class="example"/>
    <Thumbnails class="example"/>
    <ThumbnailsWithFallback class="example"/>
  </div>
</template>

<script>
import Thumbnails from '@/components/Thumbnails'
import ThumbnailsWithFallback from '@/components/thumbnailsWithFallback'
import PlainImage from '@/components/PlainImage'
import PlainImageWithCustomBlur from '@/components/PlainImageWithCustomBlur'
import Background from '@/components/Background'
import RoundedImage from '@/components/RoundedImage'

export default {
  name: 'app',

  components: {
    RoundedImage,
    PlainImage,
    Background,
    Thumbnails,
    ThumbnailsWithFallback,
    PlainImageWithCustomBlur
  }
}
</script>

<style>
*, ::after, ::before {
  box-sizing: border-box;
}
body {
  margin: 0;
  background: #e7e7e7;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  max-width: 1024px;
  text-align: center;
}

.example {
  margin-bottom: 150px;
}
</style>
