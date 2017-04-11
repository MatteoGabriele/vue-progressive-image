import { is } from '../utils'

export default {
  props: {
    src: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false
    },
    blur: {
      type: Number,
      required: false
    },
    noRatio: {
      type: Boolean,
      required: false
    }
  },

  data () {
    return {
      options: {},
      defaultBlur: 5,
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
      return !!this.image
    },

    wrapperStyle () {
      if (this.noRatio) {
        return
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

  created () {
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

      // The onload function can be triggered with a delay
      // so that the animation between a placeholder and the
      // final image is easier to see
      image.onload = setTimeout(() => {
        if (this.image) {
          return
        }

        if (this.isPollingKilled) {
          this.defineAspectRatio(image)
        }

        this.image = image.src

        // Dispatches an event on image load
        this.$emit('onLoad', image.src)
      }, delay)

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
