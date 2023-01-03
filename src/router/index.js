import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/home/Home')
const Cart = () => import('@/views/cart/Cart')
const Category = () => import('@/views/category/Category')
const Profile = () => import('@/views/profile/Profile')
const Detail = () => import('@/views/detail/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 重复点击，跳转到同一路由会报错，但不影响功能使用
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return originalPush.call(this, to).catch(err => err)
}
export default router
