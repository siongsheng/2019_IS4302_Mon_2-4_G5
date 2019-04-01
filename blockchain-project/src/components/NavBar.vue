<template>
  <nav class = "nav-extended">
    <div class="nav-wrapper blue darken-2">
      <div class="container">
        <router-link to="/" class="brand-logo">DeliverLor</router-link>
        <img :src="image" style="width:3em; height:2em; margin-left:160px; margin-top:18px;">
        <ul class="right">
          <li v-if="isLoggedIn"><router-link to="/">Dashboard</router-link></li>
          <!-- <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li> -->
          <li v-if="isLoggedIn">
            <button v-on:click="logout" class="btn black">Logout</button>
          </li>

        </ul>

        <div v-if="isBuyer || isSeller || isLogs" class="nav-content">
          <ul class="tabs tabs-transparent">
            <li v-if="isBuyer" class="tab"><a href="#/buyerViewProduct">Products</a></li>
            <li v-if="isBuyer" class="tab"><a href="#/buyerDeliveryRequest">Delivery Request</a></li>
            <li v-if="isBuyer" class="tab"><a href="#/buyerDeliveryStatus">Delivery Status</a></li>
            <li v-if="isBuyer" class="tab"><a href="#/buyerConfirmDeliveryx">Confirm Delivery</a></li>

            <li v-if="isLogs" class="tab"><a href="#/logisticsDeliveryRequest">Bid Delivery</a></li>
            <li v-if="isLogs" class="tab"><a href="#/logisticsDeliveryRequestStatus">Delivery Request Status</a></li>
            <li v-if="isLogs" class="tab"><a href="#/logisticsProductHandover">Product Handover</a></li>

            <li v-if="isSeller" class="tab"><a href="#/sellerDeliveryRequest">Delivery Status</a></li>

          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import firebase from 'firebase'
  import db from './firebaseInit'
  export default{
    name: 'navbar',
    data(){
      return{
        isloggedIn: false,
        currentUser: false,
        isAdmin: false,
        isBuyer: false,
        isSeller: false,
        isLogs: false,
        image: require('@/assets/Delivery.png')
      }
    },
    created(){
      if(firebase.auth().currentUser){
        this.isLoggedIn = true;
        this.currentUser = firebase.auth().currentUser.email;
        console.log(this.currentUser);
        var u = db.collection("users").where('email', '==', this.currentUser).limit(1).get().then((querySnapshot)=> {
          querySnapshot.forEach((doc) => {
            //console.log the current user's entire profile
            console.log(doc)
          }).then(()=>{
          })
        })
        if (firebase.auth().currentUser.email === 'group5@test.com'){
          console.log('this is admin');
          this.isAdmin = true
        }
        if (firebase.auth().currentUser.email === 'buyer1@test.com'){
          console.log('this is buyer');
          this.isBuyer = true
        }
        if (firebase.auth().currentUser.email === 'seller1@test.com'){
          console.log('this is seller');
          this.isSeller = true
        }
        if (firebase.auth().currentUser.email === 'logs1@test.com' || firebase.auth().currentUser.email === 'logs2@test.com'){
          console.log('this is logistics');
          this.isLogs = true
        }
      }
    },
    methods:{
      logout: function(){
        firebase.auth().signOut().then(() => {
          this.$router.go({path: this.$router.path});
        });
      }
    }
  }
</script>-
