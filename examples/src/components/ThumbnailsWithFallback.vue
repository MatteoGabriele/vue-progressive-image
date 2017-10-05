<template>
  <div class="wrapper">
    <h2>Thumbnails with fallback image</h2>
    <div class="thumbnails">
      <div v-for="item in items" class="item">
        <progressive-img
          :src="item.image.url"
          :placeholder="item.image.placeholder.url"
          fallback="/static/no-image.jpg"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'thumbnailsWithFallback',

  computed: {
    items () {
      return [5, 8, 6, 1, 3].map(index => ({
        image: {
          url: `/static/image-${index}.jpg`,
          placeholder: {
            url: `/static/placeholder-${index}.jpg`
          }
        }
      }))
    }
  }
}
</script>

<style scoped>
  .thumbnails {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
  }

  .item {
    flex: 1 1 280px;
    margin: 2px;
    outline: 1px solid #c9c9c9;
  }
</style>
