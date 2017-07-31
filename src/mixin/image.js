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
      cached: false
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

      this.defineAspectRatio(image)

      image.onload = () => {
        if (this.image) {
          return
        }

        if (this.isPollingKilled) {
          this.defineAspectRatio(image)
        }

        // assign the image
        this.image = image.src

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

        // dispatches an event on image load
        this.$emit('onLoad', image.src)
      }

      image.src = this.src

      // Check if the image is cached
      this.cached = image.complete
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

      image.src = src
    },

    handleImageLoading () {
      this.loadPlaceholder()
      this.loadImage()
    }
  }
}
