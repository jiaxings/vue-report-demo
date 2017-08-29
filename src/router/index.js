import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import ReportList from '@/views/ReportList'
import ReportView from '@/views/ReportView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Reports',
      component: ReportList
    },
    {
      path: '/reports/:id',
      name: 'Report Detail',
      component: ReportView
    },
    {
      path: '/about',
      name: 'About',
      component: Hello
    }
  ]
})
