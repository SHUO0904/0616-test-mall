import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


/* Layout */
import Layout from '../views/layout/Layout'
import IndexLayout from '../views/index/IndexLayout'


/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/

export const constantRouterMap = [
  { path: '/', redirect: '/index' },
  {path: '/login', component: () => import('@/views/login/index1'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  {
    path: '/index',
    component: IndexLayout,
    redirect: '',
    hidden: true,
    children: [{
      path: '/index/tool/one',
      name: '',
      component: () => import('@/views/word/index'),
      meta: {title: 'demo1', icon: ''}
    },{
      path: '/index/tool/two',
      name: '',
      component: () => import('@/views/404'),
      meta: {title: 'demo2', icon: ''}
    }
    ]
  }

]

export const asyncRouterMap = [
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'pms',
    meta: {title: '商品', icon: 'product'},
    children: [{
      path: 'product',
      name: 'product',
      component: () => import('@/views/404'),
      meta: {title: '商品列表', icon: 'product-list'}
    },
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/404'),
        meta: {title: '品牌管理', icon: 'product-brand'}
      },]
  },
  {
    path: '/ums',
    component: Layout,
    redirect: '/ums/admin',
    name: 'ums',
    meta: {title: '权限', icon: 'ums'},
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/ums/admin/index'),
        meta: {title: '用户列表', icon: 'ums-admin'}
      }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
