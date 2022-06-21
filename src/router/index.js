import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouteMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true}
]
export default new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRouteMap
})


export const asyncRouterMap = [
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'pms',
    meta: {title: '商品', icon: 'product'},
    children: [{
      path: 'product',
      name: 'pms',
      component: () => import('@/views/pms/product/index'),
      meta: {title: '商品列表', icon: 'product-list'}
    }]
  }


]
