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
    getProdNames(){
      for(var i=0; i<this.orders.length; i++){
        //console.log(this.orders[i].Id + ' ' + this.orders[i].product);
        this.products.push(this.orders[i].product);
        // axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/order/' + this.orders[i].Id)
        // .then((response) => {
        //   console.log(response.data.results.product)
        //   this.prodNames = response.data.results.product.name;
        // })
        // .catch(error => {
        //   console.log(error);
        // })
      }

      for(var j=0; j<this.products.length; j++){
        console.log(this.products[j].substring(42));
        axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/product/' +this.products[j].substring(42))
        .then((response) => {
          console.log(response.data.results.name);
          this.prodNames.push(response.data.results.name);
        })
        .catch(error => {
          console.log(error);
        })
      }
    }
  },
  mounted(){
    axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/order')
    .then((response) => {
      //console.log(response.data.results);
      this.orders = response.data.results;
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
