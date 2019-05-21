import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Leader from '@/components/Leader'
import Manager from '@/components/Manager'
import Student from '@/components/Student'
import Teacher from '@/components/Teacher'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/student',
      name: 'Student',
      component: Student
    },
    {
      path: '/teacher',
      name: 'Teacher',
      component: Teacher
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
    }
  ]
})
