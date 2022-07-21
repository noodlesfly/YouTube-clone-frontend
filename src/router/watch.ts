import { RouteRecordRaw } from 'vue-router'
const route: RouteRecordRaw = {
  path: 'watch/:videoId',
  name: 'watch',
  props: true,
  component: import(/* webpackChunkName:'watch' */'@/views/watch/index.vue'),
  meta: {
    requiresAuth: true
  }
}

export default route
