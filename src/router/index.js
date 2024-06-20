import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
  ]
})
// // 路由守卫
// // 1.判断是否登录
// router.beforeEach((to, from, next) => {
//   if (to.path === '/' || to.path === '/register' || to.path === '/index' || to.path ==='/personal') {
//     console.log('to.path不不不是哥们', to.path);
//     next();
//   } else {
//     console.log('to.path不是哥们', to.path);
//     const token = getLocalStorage('token');
//     console.log('token',token);
//     if (token) {
//       next();
//     } else {
//       alert('请先登录');
//       next('/');
//     }
//   }
// })

export default router
