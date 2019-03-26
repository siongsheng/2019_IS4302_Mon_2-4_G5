import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Dashboard from '@/components/Dashboard'
import NewUser from '@/components/NewUser'
import ViewUser from '@/components/ViewUser'
import EditUser from '@/components/EditUser'
import Login from '@/components/Login'
import BuyerDeliveryRequest from '@/components/BuyerDeliveryRequest'
import BuyerAcceptBid from '@/components/BuyerAcceptBid'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/buyerDeliveryRequest',
      name: 'buyerDeliveryRequest',
      component: BuyerDeliveryRequest,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/buyerAcceptBid',
      name: 'buyerAcceptBid',
      component: BuyerAcceptBid,
      meta:{
        requiresAuth: true
      }
    },
    {
      path:'/login',
      name: 'login',
      component:Login,
      meta:{
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-user',
      component: NewUser,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/:user_id',
      name: 'view-user',
      component: ViewUser,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/edit/:user_id',
      name: 'edit-user',
      component: EditUser,
      meta:{
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) =>{

  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!firebase.auth().currentUser){
      next({
        path:'/login',
        query:{
          redirect: to.fullPath
        }
      });
    } else{
      next();
    }
  } else if(to.matched.some(record => record.meta.requiresGuest)){
    if(firebase.auth().currentUser){
      next({
        path:'/',
        query:{
          redirect: to.fullPath
        }
      });
    } else{
      next();
    }
  } else{
    next();
  }
});

export default router;
