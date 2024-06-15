import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import CreatePersonView from '../views/CreatePersonView.vue'
import UpdatePersonView from '../views/UpdatePersonView.vue'
import ListView from '../views/ListView.vue'
import NotFound from '@/components/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/createPerson',
      name: 'createPerson',
      component: CreatePersonView,
      meta: { requiresAuth: true }
    },
    {
      path: '/updatePerson',
      name: 'updatePerson',
      component: UpdatePersonView,
      meta: { requiresAuth: true }
    },
    {
      path: '/listPerson',
      name: 'listPerson',
      component: ListView,
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    next('/login')
  } else {
    next()
  }
})

export default router
