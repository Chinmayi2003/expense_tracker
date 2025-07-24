import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginDashboard from '@/View/Login.vue'
import Dashboard from '@/View/DashboardView.vue'
import AnalyticsDashboard from '@/View/AnalyticsDashboard.vue'
import SettingDashboard from '@/View/UserSettings.vue'
import ContainerView from '@/View/ContainerView.vue'
import { auth } from '@/firebase'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: '/login',
      alias: '/',
      name: 'login',
      component: LoginDashboard
    },
    {
      path: '/',
      name: 'container',
      component: ContainerView,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard,
          meta: { requiresAuth: true }
        },
        {
          path: 'analytics',
          name: 'analytics',
          component: AnalyticsDashboard,
          meta: { requiresAuth: true }
        },
        {
          path: 'setting',
          name: 'setting',
          component: SettingDashboard,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const currentUser = auth.currentUser

  if (requiresAuth && !currentUser) {
    next({ name: 'login' })
  } else if (to.name === 'login' && currentUser) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router;