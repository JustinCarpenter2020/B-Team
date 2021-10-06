import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/Messages',
    name: 'DmPage',
    component: loadPage('DmPage'),
    beforeEnter: authGuard,
    children: [{
      path: ':id',
      name: 'MessagePage',
      component: loadPage('MessagePage'),
      beforeEnter: authGuard
    }]
  },
  {
    path: '/post/:id',
    name: 'postDetails',
    component: loadPage('PostDetailsPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: loadPage('ProfilePage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
