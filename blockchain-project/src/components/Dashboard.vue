<template>
  <div id="dashboard">
    <!-- admin dashboard -->
    <div v-if="isAdmin" id="admin-dashboard">
      <ul class="collection with-header">
        <li class="collection-header"><h4>Users</h4></li>
        <li v-for="user in users" v-bind:key="user.id" class="collection-item">
          <div class="chip">{{user.id}}</div>
          <div class="chip">{{user.email}}</div>
          {{user.name}}, {{user.contact_number}}
            <router-link class="secondary-content" v-bind:to="{ name: 'view-user', params: { user_id: user.id }}">
              <i class="fa fa-eye"></i>
            </router-link>
        </li>
      </ul>
      <ul class="collection with-header">
        <li class="collection-header"><h5>Buyer Functions</h5></li>
        <a href="#/buyerViewProduct" class="collection-item">View Products</a>
        <a href="#/buyerDeliveryRequest" class="collection-item">View Delivery Request</a>
        <a href="#/buyerDeliveryStatus" class="collection-item">View Delivery Status</a>
        <a href="#/buyerConfirmDelivery" class="collection-item">Confirm Delivery</a>
      </ul>

      <ul class="collection with-header">
        <li class="collection-header"><h5>Logistic Functions</h5></li>
        <a href="#/logisticsPlaceBid" class="collection-item">Bid Delivery</a>
        <a href="#/logisticsDeliveryRequestStatus" class="collection-item">View Delivery Request Status</a>
        <a href="#/logisticsProductHandover" class="collection-item">Product Handover</a>
      </ul>

      <ul class="collection with-header">
        <li class="collection-header"><h5>Seller Functions</h5></li>
        <a href="#/sellerDeliveryRequest" class="collection-item">View Delivery Status</a>
      </ul>
      <div class="fixed-action-btn">
        <router-link to="/new" class="btn-floating btn-large red">
          <i class="fa fa-plus"></i>
        </router-link>
      </div>
    </div>
    <!-- user dashboard -->
    <div v-else id="user-dashboard">
      <div v-if="isBuyer" id="buyer-dashboard">
        <h5 class="header">Welcome back, buyer1</h5>
        <h6>View <a href="#/buyerViewProduct"> products </a> to begin</h6>
      </div>

      <div v-if="isSeller" id="seller-dashboard">
        <h5 class="header">Welcome back, seller1</h5>
        <h6>View <a href="#/sellerDeliveryRequest"> delivery request status </a> to begin</h6>
      </div>

      <div v-if="isLogs1" id="logs-dashboard">
        <h5 class="header">Welcome back, logs1</h5>
        <h6>Place<a href="#/logisticsPlaceBid"> delivery bid </a> to begin</h6>
      </div>

      <div v-if="isLogs2" id="logs-dashboard">
        <h5 class="header">Welcome back, logs2</h5>
        <h6>Place<a href="#/logisticsPlaceBid"> delivery bid </a> to begin</h6>
      </div>
    </div>

  </div>
</template>
<script>
import db from './firebaseInit'
import firebase from 'firebase'
export default {
  name: 'dashboard',
  data () {
    return {
      users: [],
      isAdmin: false,
      isBuyer: false,
      isSeller: false,
      isLogs1: false,
      isLogs2: false
    }
  },
  created () {
    if(firebase.auth().currentUser){
      //if the user is admin, show the admin dashboard
      if (firebase.auth().currentUser.email === 'group5@test.com'){
        console.log('this is admin');
        this.isAdmin = true
        db.collection('users').orderBy('email', 'desc').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // console.log(doc)
            const data = {
              'id': doc.data().user_id,
              'name': doc.data().name,
              'email': doc.data().email,
              'contact_number': doc.data().contact_number
            }
            this.users.push(data)
          })
        })
      } else {
        // if the user is a normal user, show user dashboard instead
        this.isAdmin = false;
      }
      if (firebase.auth().currentUser.email === 'buyer1@test.com'){
        console.log('this is buyer');
        this.isBuyer = true
      }
      if (firebase.auth().currentUser.email === 'seller1@test.com'){
        console.log('this is seller');
        this.isSeller = true
      }
      if (firebase.auth().currentUser.email === 'logs1@test.com'){
        console.log('this is logistics');
        this.isLogs1 = true
      }
      if (firebase.auth().currentUser.email === 'logs2@test.com'){
        console.log('this is logistics');
        this.isLogs2 = true
      }
    }
  }
}
</script>
