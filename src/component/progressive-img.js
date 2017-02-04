import template from './progressive-img.html'
import style from './progressive-img.css'
import { is } from '../utils'

export default function (Vue, options) {
  return {
    name: 'progressive-img',

    template,

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
      alt: {
        type: String,
        required: false
      }
    },

    data () {
      return {
        options,
        style,
        defaultBlur: 5,
        image: null,
        placeholderImage: null,
        aspectRatio: 0.5625,
        isPollingKilled: false
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
        return {
          paddingBottom: `${this.aspectRatio * 100}%`
        }
      },

      placeholderStyle () {
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
          return {}
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
          setTimeout(() => {
            if (this.isPollingKilled) {
              this.defineAspectRatio(image)
            }

            this.image = image.src
          }, delay)
        }

        image.src = this.src
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
        }

        image.src = src
      },

      handleImageLoading () {
        this.loadPlaceholder()
        this.loadImage()
      }
    }
  }
}
