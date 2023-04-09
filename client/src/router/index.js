import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Authorization from '@/views/Authorization.vue'
import AdminPanel from '@/views/Admin.vue'
import User from '@/views/User.vue'
import Main from '@/views/Main.vue'
import Error from "@/views/Error"

const routes = [
  {
    path: '/',
    name: 'authorization',
    component: Authorization
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/main',
    name: 'main',
    component: Main
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPanel
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error',
    component: Error
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeResolve(async (to, from, next) => {
  if(!store.state.user.isLogin){
      await store.dispatch('user/Authorization')
  }
  
  next()
})

export default router
