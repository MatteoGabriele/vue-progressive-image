import image from '../../mixin/image'
import { is } from '../../utils'

import template from './progressive-img.html'
import style from './progressive-img.css'

export default function (options) {
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

    mixins: [image],

    data () {
      return {
        options,
        style
      }
    }
  }
}
