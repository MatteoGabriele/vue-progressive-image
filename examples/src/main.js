// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueProgressiveImage from 'vue-progressive-image'

Vue.config.productionTip = false

Vue.use(VueProgressiveImage, {
  // delay: 2000
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
