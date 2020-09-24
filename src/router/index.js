import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [

  {
    path: '/register',
    name: 'RegisterUser',
    component: () => import(/* webpackChunkName: "about" */ '../views/registerUser.vue')
  },
  {
    path: '/profileRedact',
    name: 'RedactProfile',
    component: () => import(/* webpackChunkName: "about" */ '../views/redactProfile.vue')
  },
  {
    path: '/bills',
    name: 'Bills',
    component: () => import(/* webpackChunkName: "about" */ '../views/bills.vue')
  },
  {
    path: '/calls',
    name: 'Calls',
    component: () => import(/* webpackChunkName: "about" */ '../views/calls.vue')
  },
  {
    path: '/email/authentication/:email/:token',
    name: 'EmailVerification',
    component: () => import(/* webpackChunkName: "about" */ '../views/EmailVerification.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
