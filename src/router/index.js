import Vue from 'vue'
import Router from 'vue-router'

//import Questionaire from '@/pages/Questionaire'
import HomeLoans from '@/pages/HomeLoans'
import MyDetails from '@/pages/MyDetails'
import CostToPurchase from '@/pages/CostToPurchase'
import Lenders from '@/pages/Lenders'

Vue.use(Router)

let router = new Router({
  routes: [
    //{
    //  path: '/',
    //  name: 'Questionaire',
    //  component: Questionaire
    //},
    {
      path: '/',
      name: 'My Details',
      component: MyDetails,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/home-loans',
      name: 'Home Loans',
      component: HomeLoans,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/lenders',
      name: 'Lenders',
      component: Lenders,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/cost-to-purchase',
      name: 'Cost to Purchase',
      component: CostToPurchase,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

//router.beforeEach((to, from, next) => {
//let currentUser = firebase.auth().currentUser;
//let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//if (requiresAuth && !currentUser) next('login')
//else if (!requiresAuth && currentUser) next('home-loans')
//else next()
//})

export default router
