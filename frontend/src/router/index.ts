import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/manage',
    name: 'manage',
    component: () => import(/* webpackChunkName: "manage" */ '../views/ManageView.vue')
  },
  {
    path: '/sign-in',
    name: 'singin',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/sign-up',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/SignUpView.vue')
  },
  {
    path: '/sign-out',
    name: 'signout',
    redirect: '/sign-in?signOut=true'
  },
  {
    path: '/:pageMatch(.*)*',
    name: 'UnknownRouteComponent',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
