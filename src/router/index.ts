import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import profileRule from '@/router/profile'
import watchRule from '@/router/watch'
import AppLayout from '@/layout/AppIndex.vue'
import { store } from '@/store'
import nprogress from 'nprogress'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import(/* webpackChunkName:'home' */ '@/views/home/index.vue')
      },
      profileRule,
      watchRule
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName:'home' */ '@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(to => {
  if (to.meta.requiresAuth && !store.state.user) {
    return {
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    }
  }
  nprogress.start()
})

router.afterEach(() => {
  nprogress.done()
})

export default router
