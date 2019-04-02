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
          <button class="btn waves-effect waves-light" v-on:click="submitOrder(product.price, product.stock, product.Id, selectedQty, desiredPrice[p])">Submit Order</button>
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
      buyer:[],
      //port: '',
      wallet:[]
    }
  },
  methods:{
    submitOrder(price, stock, prodId, qty, delPrice){
      let buyer = "org.deliverlor.ecommerce.Buyer#" + this.buyer.Id;
      let prod = "org.deliverlor.ecommerce.Product#" + prodId;

      let checkQty = stock-qty;
      let totalPrice = +(qty*price) + +delPrice;
      console.log(totalPrice)

      if(checkQty > 0 && totalPrice < this.wallet[0].balance){
        axios.post('http://localhost:3000/' + firebase.auth().currentUser.email + '/order', {
          "quantity": qty,
          "desiredPrice": delPrice,
          "buyer": buyer,
          "product": prod
        }).then((response) => {
          alert("success");
        })
        .catch((e) => {
          console.error(e)
        })
      }
      else if(checkQty < 0){
        alert("Quantity is more than stock!")
      }
      else if (totalPrice > this.wallet[0].balance){
        alert("You do not have sufficient money in your wallet!")
      }
    }
  },
  mounted(){
    //this.findUser();
    axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/product')
    .then((response) => {
      //console.log(response.data);
      this.products = response.data.products;
    })
    .catch(error => {
      console.log(error);
    })

    axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/wallet')
    .then((response) => {
      //console.log(response.data.wallet);
      this.wallet = response.data.wallet
    })
    .catch(error => {
      console.log(error);
    })

    axios.get('http://localhost:3000/' + firebase.auth().currentUser.email + '/buyer')
    .then((response) => {
      this.buyer = response.data.buyers[0];
    })
    .catch(error => {
      console.log(error);
    })
  }
}
</script>
