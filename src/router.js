import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginDashboard from '@/View/Login.vue'
import Dashboard from '@/View/DashboardView.vue'
import AnalyticsDashboard from '@/View/AnalyticsDashboard.vue'
import SettingDashboard from '@/View/UserSettings.vue'
import ContainerView from '@/View/ContainerView.vue'


Vue.use(VueRouter)

const routes = new VueRouter({
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
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/analytics',
            name: 'analytics',
            component: AnalyticsDashboard
        },
        {
            path: '/setting',
            name: 'setting',
            component: SettingDashboard
        }
      ]
    }
    
  ]
})

export default routes;