import progressiveImage from './component/progressive-image'

const install = function (Vue, options = {}) {
  Vue.component('progressive-image', progressiveImage(Vue, options))
}

export default {
  install
}
