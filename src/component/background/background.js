import image from '../../mixin/image'

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
