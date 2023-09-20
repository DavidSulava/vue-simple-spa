import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'RegisterUser',
    component: () => import('../views/registerUser.vue')
  },
  {
    path: '/profileRedact',
    name: 'RedactProfile',
    component: () => import('../views/redactProfile.vue')
  },
  {
    path: '/bills',
    name: 'Bills',
    component: () => import('../views/bills.vue')
  },
  {
    path: '/calls',
    name: 'Calls',
    component: () => import('../views/calls.vue')
  },
  {
    path: '/email/authentication/:email/:token',
    name: 'EmailVerification',
    component: () => import('../views/EmailVerification.vue')
  }
]



const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes
})


export default router
