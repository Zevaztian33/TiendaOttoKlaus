import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/shop',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/Shop.vue')
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },

  {
    path: '/panel',
    name: 'Panel',
    component: () => import(/* webpackChunkName: "panel" */ '../views/Panel.vue'),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/edit/:id',
    name: 'Edit',
    props: true,
    component: () => import(/* webpackChunkName: "edit" */ '../views/Edit.vue')
  },

  {
    path: '*',
    redirect: ['/']
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  let usuario = firebase.auth().currentUser;
  let login = to.matched.some(result => result.meta.requiresAuth);

  if (!usuario && login) {
    next({name: 'Login'});
  } else if(usuario && !login) {
    next();
  } else {
    next();
  }
});

export default router
