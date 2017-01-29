import progressiveImg from './component/progressive-img'

const install = function (Vue, options = {}) {
  const component = progressiveImg(Vue, options)

  /**
   * The component will have both suffix for better usability
   */
  Vue.component('progressive-img', component)
  Vue.component('progressive-image', component)
}

export default {
  install
}
