/**
 * @name progressive-image component
 * @author Matteo Gabriele <matteo@blocklevel.nl>
 */
import template from './progressive-image.html'
import style from './progressive-image.css'

export default {
  name: 'progressive-image',

  template,

  props: {
    source: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false
    },
    fadeSpeed: {
      type: Number,
      default: 1
    },
    blur: {
      type: Number,
      default: 5
    },
    alt: {
      type: String,
      required: false
    }
  },

  data () {
    return {
      style,
      image: null,
      placeholderImage: null,
      aspectRatio: 56.25
    }
  },

  computed: {
    shouldPlaceholderRender () {
      return this.placeholder && this.placeholderImage
    },

    shouldImageRender () {
      return this.image
    },

    wrapperStyle () {
      return {
        paddingBottom: `${this.aspectRatio}%`
      }
    },

    placeholderStyle () {
      if (this.blur === 0) {
        return {}
      }

      return {
        filter: `blur(${this.blur}px)`
      }
    }
  },

  created () {
    this.handleImageLoading()
  },

  methods: {
    defineAspectRatio (img) {
      const interval = setInterval(() => {
        if (!img.naturalWidth) {
          return
        }

        clearInterval(interval)

        const { naturalHeight, naturalWidth } = img

        this.aspectRatio = (naturalHeight / naturalWidth) * 100
      }, 100)
    },

    loadImage () {
      const image = new Image()

      this.defineAspectRatio(image)

      image.onload = () => {
        this.image = this.source
      }

      image.src = this.source
    },

    loadPlaceholder () {
      const image = new Image()

      image.onload = () => {
        this.placeholderImage = this.placeholder
      }

      image.src = this.placeholder
    },

    handleImageLoading () {
      if (this.placeholder) {
        this.loadPlaceholder()
      }

      this.loadImage()
    }
  }
}
