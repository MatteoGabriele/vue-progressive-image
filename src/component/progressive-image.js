import template from './progressive-image.html'
import style from './progressive-image.css'

export default function (Vue, options) {
  return {
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
            this.image = this.source
          }, 2000)
        }

        image.src = this.source
      },

      loadPlaceholder () {
        if (!this.placeholder && !this.options.placeholder) {
          return
        }

        const image = new Image()
        let source = this.placeholder

        /**
         * It no local placeholder is provided and a global placeholder is passed in the plugin
         * options, then the global placeholder is loaded
         *
         * The local placeholder always wins
         */
        if (this.options.placeholder && !this.placeholder) {
          source = this.options.placeholder
        }

        image.onload = () => {
          this.placeholderImage = source
        }

        image.src = source
      },

      handleImageLoading () {
        this.loadPlaceholder()
        this.loadImage()
      }
    }
  }
}
