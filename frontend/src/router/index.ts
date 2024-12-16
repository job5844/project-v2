// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import AdminHome from '../components/AdminHome.vue'
import Sidebar from '../components/Sidebar.vue'
import UserHome from '@/components/UserHome.vue'
import RegisterFrom from '@/components/RegisterFrom.vue'

const routes = [
 
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/AdminHome',
    name: 'AdminHome',
    component: AdminHome,Sidebar
  },
  {
    path: '/UserHome',
    name: 'UserHome',
    component: UserHome,Sidebar
  },
  {
    path: '/Register',
    name: 'Register',
    component: RegisterFrom
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token')
  
//   // กรณีไม่มี token และพยายามเข้าหน้าอื่นที่ไม่ใช่ login/register
//   if (!token && to.path !== '/login' && to.path !== '/register') {
//     next('/login')
//   } 
//   // กรณีมี token แล้วพยายามเข้าหน้า login
//   else if (token && to.path === '/login') {
//     next('/dashboard')
//   } 
//   // กรณีอื่นๆ ให้ผ่านไปได้
//   else {
//     next()
//   }
// })
  
export default router