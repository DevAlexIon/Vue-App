import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
  },
    {
        path: "/list/",
        component: () => import('@/views/PlayersList.vue')
    },
  {
    path: "/details/:id",
    name: "details",
    component: () => import('@/components/PlayerDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
