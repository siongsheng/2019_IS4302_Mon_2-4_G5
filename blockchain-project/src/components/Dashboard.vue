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
      <h3>Your wallet has ${{this.wallet[0].balance}}</h3>

      <div class="row">
        <div class="input-field col s12">
          <label>User ID: {{user_id}}</label>
        </div>
      </div>

      <br/>
      <div class="row">
      <div class="col s6">
        <h5>Top Up Wallet</h5>
        <div class="row">
            <div class="row">
              <div class="input-field col s6">
                <input type="text" placeholder="Enter top up amount ($)" id="topup_amount" v-model="topup" required>
              </div>
            </div>
            <button type="submit" class="btn" v-on:click="submitTopUp(topup)">Submit</button>
        </div>
      </div>

      <div class="col s6">
        <h5>Withdraw Wallet Funds</h5>
        <div class="row">
            <div class="row">
              <div class="input-field col s6">
                <input type="text" placeholder="Enter withdraw amount ($)" id="withdraw_amount" v-model="withdraw" required>
              </div>
            </div>
            <button type="submit" class="btn" v-on:click="submitWithdraw(withdraw)">Submit</button>
        </div>
      </div>
    </div>

    </div>

  </div>
</template>
<script>
import db from './firebaseInit'
import firebase from 'firebase'
import axios from 'axios'
export default {
  name: 'dashboard',
  data () {
    return {
      users: [],
      userEmail: firebase.auth().currentUser.email,
      wallet:[],
      isAdmin: false,
      isBuyer: false,
      isSeller: false,
      isLogs1: false,
      isLogs2: false,
      user_id: '',
      topup: '',
      withdraw: ''
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
  },
  methods:{
    submitTopUp(topup){
      axios.post('http://localhost:3000/' + firebase.auth().currentUser.email + '/wallet', {
        "amount": topup
      }).then((response) => {
        alert("success");
        this.$router.go({path: this.$router.path});
      })
      .catch((e) => {
        alert("Failed!");
        console.error(e)
      })

    },
    submitWithdraw(withdraw){
      let withdraw_amount = -withdraw;
      axios.post('http://localhost:3000/' + firebase.auth().currentUser.email + '/wallet', {
        "amount": withdraw_amount
      }).then((response) => {
        alert("success");
        this.$router.go({path: this.$router.path});
      })
      .catch((e) => {
        alert("Failed!");
        console.error(e)
      })

    }
  },
  mounted(){
    this.user_id = firebase.auth().currentUser.email.substring(0, firebase.auth().currentUser.email.length - 9);

    axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/Wallet')
    .then((response) => {
      //console.log(response.data.wallet);
      this.wallet = response.data.results
    })
    .catch(error => {
      console.log(error);
    })
  }
}
</script>
