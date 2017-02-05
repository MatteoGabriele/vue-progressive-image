import image from '../../mixin/image'

import template from './progressive-img.html'
import style from './progressive-img.css'

export default function (options) {
  return {
    name: 'progressive-img',

    template,

    props: {
      alt: {
        type: String,
        required: false
      }
    },

    mixins: [image],

    data: () => ({ options, style })
  }
}
