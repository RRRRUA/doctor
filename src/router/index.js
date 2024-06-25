import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import { getLocalStorage } from '@/common'
import { ElMessage } from 'element-plus'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/report',
      name:'Report',
      component:()=>import('../views/Report.vue')
    },
    {
      path:'/reportList',
      name:'ReportList',
      component:()=>import('../views/ReportList.vue')
    }
  ]
})
// 路由守卫
// 1.判断是否登录
router.beforeEach((to, from, next) => {
  if (to.path === '/' ) {
    console.log('to.path不不不是哥们', to.path);
    next();
  } else {
    console.log('to.path不是哥们', to.path);
    const token = getLocalStorage('token');
    console.log('token',token);
    if (token) {
      next();
    } else {
      ElMessage.error('请先登录');
      
      next('/');
    }
  }
})

export default router
