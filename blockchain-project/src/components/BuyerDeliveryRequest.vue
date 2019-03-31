<template>
  <div id="buyerDeliveryRequest">
    <ul class="collection with-header">
      <li class="collection-header"><h4>Delivery Requests</h4></li>
      <li class="collection-item avatar" v-for="(order, ord) in orders">
      <img src="../assets/bag.jpg" alt="" class="circle">
      <span class="title">Order ID: {{order.Id}}</span>
      <br>
      <span class="product">Product: {{prodNames[ord]}}</span>
      <br>
      <span class="deliveryState">Delivery State: {{order.orderState}}</span>
      <!-- <p>Product:  <br>
         Delivery State: {{order.orderState}}
      </p> -->
      <!-- <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> -->
      <!-- <a  v-bind:href="'#/buyerAcceptBid/'+ order.Id" class="secondary-content" onclick="">View</a> -->
      <router-link class="secondary-content" v-bind:to="{ name: 'buyerAcceptBid', params: { order_id: order.Id }}">
        <i class="fa fa-eye"></i>
      </router-link>
    </li>

      <!-- <li class="collection-header"><h4>Delivery Requests</h4></li>
      <li v-for="user in users" v-bind:key="user.id" class="collection-item">
        <div class="chip">{{user.id}}</div>
        <div class="chip">{{user.email}}</div>
        {{user.name}}, {{user.contact_number}}
          <router-link class="secondary-content" v-bind:to="{ name: 'view-user', params: { user_id: user.id }}"> -->

            <!-- <i class="fa fa-eye"></i>
          </router-link>
      </li> -->
    </ul>
  </div>
</template>
<script>
import firebase from 'firebase';
import axios from 'axios';
export default {
  name: 'BuyerDeliveryRequest',
  data () {
    return {
      orders: {},
      products: [],
      prodNames: [],
      port: ''
    }
  },
  methods:{
    findUser(){
      if(firebase.auth().currentUser){
        switch(firebase.auth().currentUser.email) {
          case 'buyer1@test.com':
          this.port = 3001;
          break;
          case 'seller1@test.com':
          this.port = 3002;
          break;
          case 'logs1@test.com':
          this.port = 3003;
          break;
          case 'logs2@test.com':
          this.port = 3004;
          break;
        }
      }
      //console.log(this.port);
    },
    getProdNames(){
      for(var i=0; i<this.orders.length; i++){
        this.products.push(this.orders[i].product);
      }

      for(var j=0; j<this.products.length; j++){
        console.log(this.products[j].substring(42));
        axios.get('http://localhost:' + this.port + '/api/org.deliverlor.ecommerce.Product/' +this.products[j].substring(42))
        .then((response) => {
          //console.log(response.data.name);
          this.prodNames.push(response.data.name);
        })
        .catch(error => {
          console.log(error);
        })
      }
    }
  },
  mounted(){
    this.findUser();
    axios.get('http://localhost:' + this.port + '/api/org.deliverlor.ecommerce.Order')
    .then((response) => {
      console.log(response.data);
      this.orders = response.data;
    })
    .then((response) => {
      this.getProdNames();
    })
    .catch(error => {
      console.log(error);
    })
  }
}
</script>
