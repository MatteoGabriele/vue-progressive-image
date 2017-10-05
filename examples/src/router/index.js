import Vue from 'vue'
import Router from 'vue-router'
import Thumbnails from '@/components/Thumbnails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'thumbnails',
      component: Thumbnails
    }
  ]
})
