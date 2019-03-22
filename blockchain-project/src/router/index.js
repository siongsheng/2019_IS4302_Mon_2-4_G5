import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import ViewParticipant from '@/components/viewParticipant'
import EditParticipant from '@/components/editParticipant'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/:participant_id',
      name: 'view-participant',
      component: ViewParticipant
    },
    {
      path: '/edit/:participant_id',
      name: 'edit-participant',
      component: EditParticipant
    }
  ]
})
