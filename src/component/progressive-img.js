import template from './progressive-img.html'
import style from './progressive-img.css'

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
        aspectRatio: 56.25
      }
    },

    computed: {
      shouldPlaceholderRender () {
        return this.placeholderImage
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
        const blur = this.blur || this.options.blur || this.defaultBlur

        if (blur === 0) {
          return {}
        }

        return {
          filter: `blur(${blur}px)`
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
          setTimeout(() => {
            this.image = this.src
          }, this.options.delay || 0)
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
