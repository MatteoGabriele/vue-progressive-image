import image from '../../mixin/image'

import template from './progressive-background.html'
import style from './progressive-background.css'

export default function (options) {
  return {
    name: 'progressive-background',

    template,

    mixins: [image],

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
        style,
        options,
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
}
