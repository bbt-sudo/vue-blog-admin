import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Cookies from 'js-cookie'
import Home from '../layout/index.vue'
import { ElMessage } from 'element-plus'

const modules = import.meta.glob('./modules/**/*.ts', { eager: true })

const routeModuleList: RouteRecordRaw[] = []

Object.values(modules).forEach((key: any) => {
  const mod = key.default || []
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
  routeModuleList.sort((a, b) => {
    const orderA = a?.meta?.order || 0
    const orderB = b?.meta?.order || 0
    return orderA - orderB
  })
})

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'home',
    },
    component: Home,
    children: [...routeModuleList],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'login',
    },
    component: () => import('../views/login/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (!Cookies.get('token') && to.path !== '/login') {
    next('/login')
  } else if (Cookies.get('token') && to.path == '/login') {
    ElMessage({
      message: '已经登陆过了',
      type: 'warning',
    })
    next('/')
  }
  next()
})

export default router
