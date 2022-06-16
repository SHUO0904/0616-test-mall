import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouteMap =[
    {path:'/login',component:() => import('@/views/login/index'),hidden:true}
]
export default new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRouteMap
})
