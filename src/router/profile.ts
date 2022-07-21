import { RouteRecordRaw, RouterView } from 'vue-router'
const route: RouteRecordRaw = {
  path: 'profile',
  name: 'profile',
  component: RouterView,
  meta: {
    requiresAuth: true
  },
  children: [
    {
      path: 'profile_index',
      name: 'profile_index',
      component: () => import(/* webpackChunkName:'profile' */'@/views/profile/index.vue')
    }
  ]
}

export default route
