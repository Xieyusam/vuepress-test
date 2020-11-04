# Vue路由懒加载
这是个大部分Vue搭建的项目常用的写法

可以提高Vue首屏加载的速度

虽然已经学会，但是还是想记录一下

避免以后可能少用Vue的时候我还能在这里温故知新

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login/login' // 正常的import引入
import error from '@/view/error.vue'
import error2 from '@/view/error2.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login // 正常的import引入
    },
    {
      path: '/error',
      name: 'error',
      component: resolve => require(['@/view/error'], resolve) // 懒加载的写法，需要路由跳转才加载
    },
    {
      path: '/error2',
      name: 'error2',
      component: resolve => require(['@/view/error2'], resolve)
    },
    {
      path: '/',
      component: resolve => require(['@/view/index/index'], resolve),
      children: [
        {
          path: '/',
          name: 'index',
          component: resolve => require(['@/components/map/map'], resolve)
        },```
