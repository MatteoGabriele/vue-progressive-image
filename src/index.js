import pImg from './component/progressive-img/progressive-img'
import pBackground from './component/progressive-background/progressive-background'

const install = function (Vue, options = {}) {
  // The component will have both suffix for better usability
  Vue.component('progressive-img', pImg(options))
  Vue.component('progressive-image', pImg(options))
  Vue.component('progressive-background', pBackground(options))
}

export default {
  install
}
