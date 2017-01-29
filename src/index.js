import progressiveImage from './component/progressive-image'

const install = function (Vue, options = {}) {
  Vue.component('progressive-image', progressiveImage)
}

export default {
  install
}
