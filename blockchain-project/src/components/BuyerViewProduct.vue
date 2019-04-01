<template>
  <div id="buyerViewProduct">
    <h2 class="header">Products</h2>
    <div class="row">
    <div class="col s4" v-for="(product, p) in products">
      <div class="card">
        <div class="card-image">
          <img src="../assets/bag.jpg">
        </div>
        <div class="card-content">
          <span class="card-title">{{product.name}}</span>
          <p>Price: $ {{product.price}}<br>
             Description: {{product.description}}<br>
             Quantity Available: {{product.stock}}</p>
        </div>
        <div class="card-action">
          <select class="browser-default" v-model="selectedQty">
            <option value="" disabled selected>Select quantity</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <!-- <a href="#">This is a link</a> -->
          <br>
          <input v-model="desiredPrice[p]" placeholder="Desired Delivery Price ($)">
          <br>
          <!--To replace correct onclick function -->
          <button class="btn waves-effect waves-light" v-on:click="submitOrder(product.Id, selectedQty, desiredPrice[p])">Submit Order</button>
        </div>
      </div>
    </div>
  </div>
      <p id="demo"></p>
  </div>
</template>
<script>
import firebase from 'firebase';
import axios from 'axios';
export default {
  name: 'BuyerViewProduct',
  data () {
    return {
      products: {},
      selectedQty:'',
      desiredPrice: {},
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
    },
    submitOrder(prodId, qty, price){
      let buyer = "org.deliverlor.ecommerce.Buyer#" + firebase.auth().currentUser.email;
      let prod = "org.deliverlor.ecommerce.Product#" + prodId;

      axios.post('http://localhost:3000/' + firebase.auth().currentUser.email + '/order', {
        "quantity": qty,
        "desiredPrice": price,
        "buyer": buyer,
        "product": prod
      }).then((response) => {
        alert("success");
      })
      .catch((e) => {
        console.error(e)
      })
    }
  },
  mounted(){
    this.findUser();
    axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/Product')
    .then((response) => {
      //console.log(response.data);
      this.products = response.data.products;
    })
    .catch(error => {
      console.log(error);
    })
  }
}
</script>
