import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import CreatePersonView from '../views/CreatePersonView.vue';
import UpdatePersonView from '../views/UpdatePersonView.vue';
import DeletePersonView from '../views/DeletePersonView.vue';
import ListView from '../views/ListView.vue';
import DetailsView from '../views/DetailsView.vue';

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
      component: CreatePersonView
    },
    {
      path: '/updatePerson',
      name: 'updatePerson',
      component: UpdatePersonView
    },
    {
      path: '/deletePerson',
      name: 'deletePerson',
      component: DeletePersonView
    },
    {
      path: '/listPerson',
      name: 'listPerson',
      component: ListView
    },
    {
      path: '/detailsPerson',
      name: 'detailsPerson',
      component: DetailsView
    },
  ]
});

export default router;
