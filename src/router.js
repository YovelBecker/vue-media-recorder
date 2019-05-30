import Vue from 'vue'
import Router from 'vue-router'
import SingleImg from './views/SingleImg.vue'
import MultipleImg from './views/MultipleImg.vue'
const VideoRec = () => import('./views/VideoRec')
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'singleImg',
      component: SingleImg
    },
    {
      path: '/img/mult',
      name: 'multipleImg',
      component: MultipleImg
    },
    {
      path: '/video',
      name: 'videoRec',
      component: VideoRec
    },
  ]
})
