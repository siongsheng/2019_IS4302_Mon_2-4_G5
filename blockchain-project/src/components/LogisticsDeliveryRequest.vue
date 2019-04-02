<template>
  <div id="logisticsDeliveryRequest">
    <h3 class="header">Bid for Delivery</h3>
    <table>
        <thead>
          <tr>
              <th>Order</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Seller</th>
              <th>Seller Contact</th>
              <th>Reserve amount</th>
              <th>Place bid</th>
          </tr>
        </thead>

        <tbody>

          <tr v-for="(logReq, log) in logReqs">
            <td>{{logReq.Id}}</td>
            <td>{{prodNames[log]}}</td>
            <td>{{orderQtys[log]}}</td>
            <td>{{sellerNames[log]}}</td>
            <td>{{sellerContacts[log]}}</td>
            <td>$ {{logReq.desiredPrice}}</td>
            <!-- <td><button class="btn waves-effect waves-light" :disabled='isDisabled(logReq.state)' onclick="">Bid</button></td> -->
            <td><router-link class="btn waves-effect waves-light" :disabled='isDisabled(logReq.state)'
              v-bind:to="{ name: 'logisticsPlaceBid', params: { logReq_id: logReq.Id }}" tag="button">Bid</router-link></td>
          </tr>

        </tbody>
      </table>
  </div>

  </div>
</template>
</template>
<script>
import firebase from 'firebase';
import axios from 'axios';
export default {
  name: 'LogisticsDeliveryRequest',
  data () {
    return {
      logReqs: {},
      orders: [],
      orderQtys: [],
      products: [],
      prodNames: [],
      sellers:[],
      sellerNames:[],
      sellerContacts:[],
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
    isDisabled(state){
      if (state !== "OPEN"){
        return true;
      }
    },
    getOrders(){
      for(var i=0; i<this.logReqs.length; i++){
        this.orders.push(this.logReqs[i].order);
      }
    },
    getOrderQuantity(){
      for(var j=0; j<this.orders.length; j++){
        console.log(this.orders[j].substring(40));
        axios.get('http://localhost:3001' + '/api/org.deliverlor.ecommerce.Order/' +this.orders[j].substring(40))
        .then((response) => {
          //console.log(response.data.quantity);
          this.orderQtys.push(response.data.quantity);
          this.products.push(response.data.product);
          //console.log("it is a:" + this.products.length)
        })
        .catch(error => {
          console.log(error);
        })
      }
      console.log(this.orderQtys);
    },
    getProductNames(){
      for(var k=0; k<this.products.length; k++){
        axios.get('http://localhost:' + this.port + '/api/org.deliverlor.ecommerce.Product/' + this.products[k].substring(42))
        .then((response) => {
          //console.log(response.data.name);
          this.prodNames.push(response.data.name);
          this.sellers.push(response.data.seller);
        })
        .catch(error => {
          console.log(error);
        })
      }
    },
    getSellerNames(){
      for(var k=0; k<this.sellers.length; k++){
        axios.get('http://localhost:3002' + '/api/org.deliverlor.ecommerce.Seller/' + this.sellers[k].substring(41))
        .then((response) => {
          //console.log(response.data.name);
          this.sellerNames.push(response.data.name);
          this.sellerContacts.push(response.data.contactNum)
        })
        .catch(error => {
          console.log(error);
        })
      }

    }
  },
  mounted(){
    this.findUser();
    var self = this;
    axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/logisticsrequest')
    .then((response) => {
      console.log(response.data.logisticsRequests);
      this.logReqs = response.data.logisticsRequests;
    })
    .then((response) => {
      this.getOrders();
      this.getOrderQuantity();
      //this.getProductNames();
    })
    .then((response) => {
      setTimeout(function() {
        self.getProductNames();
      }, 1000);
    })
    .then((response) => {
      setTimeout(function() {
        self.getSellerNames();
      }, 2000);
    })
    .catch(error => {
      console.log(error);
    })

  }
}
</script>
