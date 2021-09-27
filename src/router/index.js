import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGard from './auth-gard'
import Home from '../components/Home'
import Add from '../components/adds/Add'
import AddList from '../components/adds/AddList'
import NewAdd from '../components/adds/NewAdd'
import Login from '../components/auth/Login'
import Registration from '../components/auth/Registration'
import Orders from '../components/order/Order'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/add/:id',
    name: 'Add',
    props: true,
    component: Add,
    beforeEnter: AuthGard
  },
  {
    path: '/new',
    name: 'NewAdd',
    component: NewAdd,
    beforeEnter: AuthGard

  },
  {
    path: '/list',
    name: 'AddList',
    component: AddList,
    beforeEnter: AuthGard

  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    beforeEnter: AuthGard

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
