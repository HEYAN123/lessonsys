import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Honor from '@/components/Honor'
import Perform from '@/components/Perform'
import Staff from '@/components/Staff'
import Leader from '@/components/Leader'
import Manager from '@/components/Manager'
import Forum from '@/components/Forum'
import NewsContent from '@/components/Newscontent'
import Newseditor from '@/components/Newseditor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/honor',
      name: 'Honor',
      component: Honor
    },
    {
      path: '/perform',
      name: 'Perform',
      component: Perform
    },
    {
      path: '/staff',
      name: 'Staff',
      component: Staff
    },
    {
      path: '/leader',
      name: 'Leader',
      component: Leader
    },
    {
      path: '/manager',
      name: 'Manager',
      component: Manager
    },
    {
      path: '/forum',
      name: 'Forum',
      component: Forum
    },
    {
      path: '/newscontent/:id',
      name: 'Newscontent',
      component: NewsContent
    },
    {
      path: '/newseditor',
      name: 'Newseditor',
      component: Newseditor
    },
  ]
})
