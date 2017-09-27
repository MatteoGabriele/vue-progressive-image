import { is } from '../utils'

export default {
  props: {
    src: {
      type: String,
      required: true
    },
    placeholder: {
      type: String
    },
    blur: {
      type: Number
    },
    noRatio: {
      type: Boolean
    },
    fallback: {
      type: String
    }
  },

  data () {
    return {
      isRendered: false,
      options: {},
      defaultBlur: 20,
      image: null,
      placeholderImage: null,
      aspectRatio: 0.5625,
      isPollingKilled: false,
      cached: false,
      imageError: false
    }
  },

  watch: {
    src () {
      this.handleImageLoading()
    }
  },

  computed: {
    shouldPlaceholderRender () {
      return !!this.placeholderImage
    },

    shouldImageRender () {
      return this.isRendered
    },

    wrapperStyle () {
      if (this.noRatio) {
        return {}
      }

      return {
        paddingBottom: `${this.aspectRatio * 100}%`
      }
    },

    blurStyle () {
      let blur = this.defaultBlur

      if (is(this.blur)) {
        return this.getBlurStyle(this.blur)
      }

      if (is(this.options.blur)) {
        return this.getBlurStyle(this.options.blur)
      }

      return this.getBlurStyle(blur)
    }
  },

  mounted () {
    this.handleImageLoading()
  },

  methods: {
    getBlurStyle (amount) {
      if (amount === 0) {
        return
      }

      return {
        filter: `blur(${amount}px)`
      }
    },

    defineAspectRatio (img) {
      const delay = this.options.timeout || 2500
      const pollInterval = this.options.pollInterval || 80

      const poll = setInterval(() => {
        if (!img.naturalWidth) {
          return
        }

        clearInterval(poll)

        const { naturalHeight, naturalWidth } = img

        this.aspectRatio = naturalHeight / naturalWidth
      }, pollInterval)

      setTimeout(() => {
        if (img.naturalWidth) {
          return
        }

        clearInterval(poll)
        this.isPollingKilled = true
      }, delay)
    },

    loadImage () {
      const image = new Image()
      const delay = this.options.delay || 0
      const imageSource = this.imageError ? this.fallback : image.src

      // reset the image holder
      this.image = null
      this.isRendered = false

      this.defineAspectRatio(image)

      image.onload = () => {
        if (this.image) {
          return
        }

        if (this.isPollingKilled) {
          this.defineAspectRatio(image)
        }

        // assign the image
        this.image = imageSource

        // the drawImage it's a synchronous method, so when it's done
        // the nextTick will notify the view that we're ready
        // to fadeIn the main image
        const ctx = this.$refs.canvas.getContext('2d')
        ctx.drawImage(this.$refs.main, 0, 0)

        // next tick to know when the image is rendered
        this.$nextTick(() => {
          // timeout for a custom delay
          setTimeout(() => {
            this.isRendered = true
          }, delay)
        })

        this.imageError = false

        this.$emit('onLoad', image.src)
      }

      image.onerror = error => {
        this.$emit('onError', error)

        if (process.env.NODE_ENV !== 'production' && !this.fallback) {
          console.warn('[vue-progressive-image] An error occured during the image loading')
        }

        if (this.fallback) {
          this.imageError = true
          this.handleImageLoading()
        }
      }

      image.src = imageSource
    },

    loadPlaceholder () {
      if (!this.placeholder && !this.options.placeholder) {
        return
      }

      const image = new Image()
      let src = this.placeholder

      if (this.options.placeholder && !this.placeholder) {
        src = this.options.placeholder
      }

      image.onload = () => {
        this.placeholderImage = src

        // Dispatches an event on placeholder image load
        this.$emit('onLoadPlaceholder', src)
      }

      image.onerror = error => {
        this.$emit('onPlaceholderError', error)

        if (process.env.NODE_ENV !== 'production') {
          console.warn('[vue-progressive-image] An error occured during the placeholder image loading')
        }
      }

      image.src = src
    },

    handleImageLoading () {
      this.loadPlaceholder()
      this.loadImage()
    }
  }
}
