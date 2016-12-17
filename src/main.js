import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import NProgress from 'nprogress'//页面顶部进度条
import 'nprogress/nprogress.css'

//index
//import Index from './components/index/index'
import Admin from './components/admin/admin'

//admin
import AdminLogin from './components/admin/login'
import UserAuth from './components/admin/user/auth'
import userList from './components/admin/user/list'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
  /* {
   path: '/',
   component: Index,
   name: '首页',
   iconCls: 'el-icon-message',//图标样式class
   children: [
   {path: '/auth', component: auth, name: '权限管理'}
   ]
   },*/
  //{ path: '/main', component: Main },
  {
    path: '/admin/login',
    component: AdminLogin,
    hidden: true
  },
  {
    path: '/admin',
    component: Admin,
    name: '用户管理',
    iconCls: 'el-icon-message',//图标样式class
    children: [
      {path: '/userauth', component: UserAuth, name: '权限管理'},
      {path: '/userList', component: userList, name: '用户列表'}
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})

router.afterEach(transition => {
  NProgress.done();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: {App}
}).$mount('#app')

router.replace('/admin/login')
